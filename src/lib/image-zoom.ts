/**
 * Instant image zoom for anchors that wrap an <img> and link to the
 * full-size file.
 *
 * The zoom CSS-scales the inline img, computing the scale from the img's
 * width/height attributes, so the animation starts without waiting on any
 * network fetch. When the img has srcset+sizes, the full-size file is
 * fetched and decoded off-screen, then `sizes` is bumped to the full width:
 * the browser swaps the pixels in place from cache in one repaint, never
 * blanking or painting the download top-to-bottom.
 *
 * Focus stays on the anchor (which keeps working as a plain link without
 * JS), and `aria-expanded` reflects the zoom state. No focus trap: Esc,
 * backdrop click, img click, and scrolling past a threshold all close it.
 * `prefers-reduced-motion` disables the transitions via CSS.
 *
 * Override the injected defaults with custom properties:
 * `--image-zoom-backdrop`, `--image-zoom-duration`, `--image-zoom-z`,
 * `--image-zoom-ease`.
 *
 * Assumes:
 * - The img is display:block, so the anchor's rect tracks the img; the
 *   translate math relies on that.
 * - anchor.href serves the same URL as the top srcset candidate, or the
 *   sharpen prefetch and the `sizes` bump download two different files.
 * - No stacking context between the img and the root, or the zoomed img
 *   lands under the backdrop. medium-zoom clones the node to dodge this,
 *   but a clone would break the in-place srcset upgrade.
 */

export type ImageZoomOptions = {
  /**
   * Viewport gap (px) per axis: width and height each shrink by this much,
   * centered so it splits between the two sides. Default 16.
   */
  padding?: number;
  /** Transition duration in ms. Default 300. */
  duration?: number;
  /** Scroll distance (px) that dismisses the zoom; false disables. Default 40. */
  scrollClose?: number | false;
  /** Backdrop color. Default rgb(0 0 0 / 0.9). */
  backdrop?: string;
  /** z-index of the zoomed image; the backdrop sits one below. Default 1000000. */
  zIndex?: number;
};

type OpenState = {
  anchor: HTMLAnchorElement;
  img: HTMLImageElement;
  scrollStart: number;
  closing: boolean;
  teardownTimer: ReturnType<typeof setTimeout> | undefined;
  /** Removes the window listeners bound for this zoom. */
  unbind: () => void;
};

const CSS = `
.image-zoom-target {
  cursor: zoom-in;
  transition: transform var(--image-zoom-duration, 300ms)
    var(--image-zoom-ease, cubic-bezier(0.2, 0, 0.1, 1));
}
.image-zoom-open {
  position: relative;
  z-index: var(--image-zoom-z, 1000000);
  cursor: zoom-out;
}
.image-zoom-backdrop {
  position: fixed;
  inset: 0;
  z-index: calc(var(--image-zoom-z, 1000000) - 1);
  background: var(--image-zoom-backdrop, rgb(0 0 0 / 0.9));
  cursor: zoom-out;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--image-zoom-duration, 300ms) ease,
    visibility 0s var(--image-zoom-duration, 300ms);
}
.image-zoom-backdrop.image-zoom-visible {
  opacity: 1;
  visibility: visible;
  transition: opacity var(--image-zoom-duration, 300ms) ease;
}
@media (prefers-reduced-motion: reduce) {
  .image-zoom-target,
  .image-zoom-backdrop {
    transition: none;
  }
}
`;

let state: OpenState | null = null;
let backdrop: HTMLDivElement | null = null;

function ensureSetup(): HTMLDivElement {
  if (!document.getElementById("image-zoom-css")) {
    const style = document.createElement("style");
    style.id = "image-zoom-css";
    style.textContent = CSS;
    document.head.appendChild(style);
  }
  // isConnected: an SPA body swap can strand the old backdrop.
  if (!backdrop || !backdrop.isConnected) {
    backdrop = document.createElement("div");
    backdrop.className = "image-zoom-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.addEventListener("click", close);
    document.body.appendChild(backdrop);
  }
  return backdrop;
}

function closeDuration(img: HTMLImageElement): number {
  // CSS is the source of truth: --image-zoom-duration may be overridden by
  // the host, and reduced motion zeroes it. Trusting the JS option here
  // would desync the timer and drop the z-index mid-shrink.
  return (parseFloat(getComputedStyle(img).transitionDuration) || 0) * 1000;
}

/**
 * Scale to fit the viewport minus padding, capped at the image's natural
 * size; translate to the viewport center. Reads layout geometry only
 * (offsetWidth + the anchor's rect), which a transform on the img doesn't
 * affect, so it stays correct when recomputing mid-zoom (e.g. on resize).
 */
function computeTransform(
  anchor: HTMLAnchorElement,
  img: HTMLImageElement,
  padding: number,
): string {
  const width = img.offsetWidth;
  const height = img.offsetHeight;
  const naturalWidth = Number(img.getAttribute("width")) || img.naturalWidth;
  const naturalHeight = Number(img.getAttribute("height")) || img.naturalHeight;
  // Rendered px -> natural px; never upscale past the file's real size.
  const maxScale = naturalWidth / width || 1;

  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const availWidth = Math.max(viewportWidth - padding, padding);
  const availHeight = Math.max(viewportHeight - padding, padding);

  let scale: number;
  if (naturalWidth <= availWidth && naturalHeight <= availHeight) {
    scale = maxScale;
  } else if (naturalWidth / naturalHeight < availWidth / availHeight) {
    scale = (availHeight / naturalHeight) * maxScale;
  } else {
    scale = (availWidth / naturalWidth) * maxScale;
  }

  // The img is display:block inside the anchor, so the anchor's rect tracks
  // the img's untransformed position.
  const rect = anchor.getBoundingClientRect();
  const translateX = Math.round(viewportWidth / 2 - (rect.left + width / 2));
  const translateY = Math.round(viewportHeight / 2 - (rect.top + height / 2));

  // translate() is listed first so it applies after scale() and stays in
  // unscaled viewport px.
  return `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

/**
 * Point `sizes` at the full width so the browser upgrades the displayed
 * pixels to the top srcset candidate. Persists after close: the img stays
 * sharp.
 */
function upgradeSizes(img: HTMLImageElement): void {
  const width = img.getAttribute("width");
  if (width && img.getAttribute("sizes")) {
    img.sizes = `${width}px`;
  }
}

const sharpened = new WeakSet<HTMLImageElement>();

/**
 * Fetch + decode the full-size file off-screen, then bump `sizes`. The bump
 * resolves from the warm HTTP cache, so the browser swaps bitmaps in one
 * repaint. A cold bump blanks the img and paints the download top-to-bottom.
 */
function sharpen(img: HTMLImageElement, href: string): void {
  if (sharpened.has(img)) {
    return;
  }
  // Same gate as the bump: no srcset/sizes (GIFs) means nothing to upgrade,
  // and fetching href would be a second full download.
  if (!img.getAttribute("sizes") || !img.getAttribute("width")) {
    return;
  }
  sharpened.add(img);
  const full = new Image();
  full.addEventListener("load", () => {
    // Downloaded. decode() can still reject (e.g. memory pressure), but the
    // cache is warm, so bumping is safe either way.
    full.decode().then(
      () => upgradeSizes(img),
      () => upgradeSizes(img),
    );
  });
  full.addEventListener("error", () => {
    // Download failed: keep showing the current pixels and allow a retry on
    // the next zoom intent.
    sharpened.delete(img);
  });
  full.src = href;
}

function open(
  anchor: HTMLAnchorElement,
  img: HTMLImageElement,
  options: { padding: number; scrollClose: number | false },
): void {
  // A different zoom in flight (open or closing): finish it on the spot so
  // the two never overlap.
  if (state) {
    finalize(state);
  }

  const backdropEl = ensureSetup();
  sharpen(img, anchor.href);
  img.classList.add("image-zoom-open");
  img.style.transform = computeTransform(anchor, img, options.padding);
  backdropEl.classList.add("image-zoom-visible");
  anchor.setAttribute("aria-expanded", "true");

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      close();
    }
  };
  const onScroll = () => {
    if (
      state &&
      options.scrollClose !== false &&
      Math.abs(window.scrollY - state.scrollStart) >= options.scrollClose
    ) {
      close();
    }
  };
  const onResize = () => {
    if (state && !state.closing) {
      img.style.transform = computeTransform(anchor, img, options.padding);
    }
  };
  // Tabbing away would leave focus behind the backdrop, ring invisible;
  // treat leaving the trigger as dismissal. relatedTarget is null for
  // mousedown blurs (Safari/Firefox don't mouse-focus anchors, and closing
  // here would make the click's toggle reopen) — those clicks land on the
  // img or backdrop, which close by themselves.
  const onFocusout = (event: FocusEvent) => {
    if (
      event.relatedTarget instanceof Node &&
      !anchor.contains(event.relatedTarget)
    ) {
      close();
    }
  };
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  anchor.addEventListener("focusout", onFocusout);

  state = {
    anchor,
    img,
    scrollStart: window.scrollY,
    closing: false,
    teardownTimer: undefined,
    unbind: () => {
      window.removeEventListener("keydown", onKeydown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      anchor.removeEventListener("focusout", onFocusout);
    },
  };
}

function close(): void {
  if (!state || state.closing) {
    return;
  }
  state.closing = true;
  state.unbind();
  state.anchor.setAttribute("aria-expanded", "false");
  state.img.style.transform = "";
  backdrop?.classList.remove("image-zoom-visible");
  // Keep the open class (z-index) while the shrink animation runs.
  state.teardownTimer = setTimeout(
    () => {
      if (state) {
        state.img.classList.remove("image-zoom-open");
        state = null;
      }
    },
    closeDuration(state.img) + 50,
  );
}

/** Skip animations and reset a zoom's DOM state immediately. */
function finalize(current: OpenState): void {
  clearTimeout(current.teardownTimer);
  current.unbind();
  current.anchor.setAttribute("aria-expanded", "false");
  current.img.style.transform = "";
  current.img.classList.remove("image-zoom-open");
  backdrop?.classList.remove("image-zoom-visible");
  state = null;
}

/**
 * Attach zoom behavior to anchors wrapping an <img>. Returns a cleanup
 * function that detaches everything (for SPA navigation reuse).
 */
export function attachImageZoom(
  anchors: Iterable<HTMLAnchorElement>,
  options: ImageZoomOptions = {},
): () => void {
  const { padding = 16, scrollClose = 40 } = options;

  const root = document.documentElement;
  if (options.backdrop) {
    root.style.setProperty("--image-zoom-backdrop", options.backdrop);
  }
  if (options.zIndex !== undefined) {
    root.style.setProperty("--image-zoom-z", String(options.zIndex));
  }
  if (options.duration !== undefined) {
    root.style.setProperty("--image-zoom-duration", `${options.duration}ms`);
  }

  const cleanups: Array<() => void> = [];

  for (const anchor of anchors) {
    const img = anchor.querySelector("img");
    if (!img) {
      continue;
    }

    img.classList.add("image-zoom-target");
    anchor.setAttribute("aria-expanded", "false");

    const toggle = () => {
      if (state && state.anchor === anchor && !state.closing) {
        close();
      } else {
        open(anchor, img, { padding, scrollClose });
      }
    };
    const onClick = (event: MouseEvent) => {
      // Modifier clicks: keep the anchor's native new-tab/window behavior.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      event.preventDefault();
      toggle();
    };
    // Anchors activate on Enter only; add Space for parity with buttons.
    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        // A held Space auto-repeats and would flicker the zoom.
        if (!event.repeat) {
          toggle();
        }
      }
    };
    // The zoom no longer waits on the full-size fetch, but starting it a
    // beat early means the pixels sharpen sooner. Mouse only: on touch this
    // fires for scroll flicks that land on a figure, downloading full-size
    // images nobody zooms.
    const warm = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        sharpen(img, anchor.href);
      }
    };
    anchor.addEventListener("click", onClick);
    anchor.addEventListener("keydown", onKeydown);
    anchor.addEventListener("pointerdown", warm);

    cleanups.push(() => {
      anchor.removeEventListener("click", onClick);
      anchor.removeEventListener("keydown", onKeydown);
      anchor.removeEventListener("pointerdown", warm);
      anchor.removeAttribute("aria-expanded");
      img.classList.remove("image-zoom-target");
      if (state && state.anchor === anchor) {
        finalize(state);
      }
    });
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
