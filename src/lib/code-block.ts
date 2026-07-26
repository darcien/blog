/**
 * Toolbar for markdown code blocks: copy to clipboard and a soft-wrap toggle.
 */

/** How long the copy button shows its result before reverting. */
const COPY_RESET_MS = 1500;

export function enhanceCodeBlocks(pres: Iterable<Element>) {
  for (const pre of pres) {
    enhance(pre);
  }
  // Live regions announce text that lands after they exist, so create it
  // before any click.
  statusRegion();
}

function enhance(pre: Element) {
  const code = pre.querySelector("code");
  if (!code) return;
  // Keeps a second pass (view transitions, a second caller) from nesting
  // wrappers and stacking toolbars.
  if (pre.parentElement?.classList.contains("code-block")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "code-block";
  // Insert, then move the block in: it stays in the document throughout.
  pre.before(wrapper);
  wrapper.append(buildToolbar(wrapper, code), pre);
}

function buildToolbar(wrapper: HTMLElement, code: Element): HTMLElement {
  const toolbar = document.createElement("div");
  toolbar.className = "code-toolbar";
  toolbar.append(buildWrapButton(wrapper), buildCopyButton(code));
  return toolbar;
}

/**
 * The label names the next click, the reflowing code carries the state.
 * Adding aria-pressed on top of the rename announces "unwrap, pressed".
 */
function buildWrapButton(wrapper: HTMLElement): HTMLButtonElement {
  const button = buildButton("wrap", WRAP_NAME);
  button.addEventListener("click", () => {
    const wrapped = wrapper.toggleAttribute("data-wrap");
    setLabel(
      button,
      wrapped ? "unwrap" : "wrap",
      wrapped ? UNWRAP_NAME : WRAP_NAME,
    );
    // A focused button renaming itself announces inconsistently, so state
    // goes through the live region.
    announce(wrapped ? "Soft wrap on" : "Soft wrap off");
  });
  return button;
}

function buildCopyButton(code: Element): HTMLButtonElement {
  const button = buildButton("copy", "copy code");
  let latestClick = 0;
  let resetTimer: number | undefined;

  /**
   * Show a result, then restore "copy". The message goes to the shared live
   * region, which announces reliably while the button holds focus.
   */
  const flash = (label: string, message: string) => {
    setLabel(button, label, `${label}, copy code`);
    announce(message);
    clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      setLabel(button, "copy", "copy code");
    }, COPY_RESET_MS);
  };

  button.addEventListener("click", async () => {
    const click = ++latestClick;
    try {
      await navigator.clipboard.writeText(codeText(code));
      // Only the newest click writes its result.
      if (click === latestClick) flash("copied", "Copied");
    } catch {
      // Clipboard writes reject on insecure origins and denied permission.
      if (click === latestClick) flash("failed", "Copy failed");
    }
  });
  return button;
}

/**
 * textContent reads through Shiki's per-line spans and stays the same however
 * the block renders. Shiki drops the fence's closing newline; a shell paste
 * needs it back.
 */
function codeText(code: Element): string {
  const text = code.textContent ?? "";
  return text.endsWith("\n") ? text : `${text}\n`;
}

/**
 * Both names contain their button's visible word, so speech input still
 * matches what's on screen (WCAG 2.5.3).
 */
const WRAP_NAME = "wrap long lines";
const UNWRAP_NAME = "unwrap long lines";

function buildButton(label: string, name: string): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-btn";
  setLabel(button, label, name);
  return button;
}

/**
 * Visible label and accessible name move together, so the name keeps the
 * visible word even while copy flashes a result (WCAG 2.5.3).
 */
function setLabel(button: HTMLButtonElement, label: string, name: string) {
  button.textContent = `[${label}]`;
  button.ariaLabel = name;
  button.title = name;
}

let region: HTMLElement | undefined;
let announceTimer: number | undefined;

/** One polite live region for every block on the page. */
function statusRegion(): HTMLElement {
  if (!region) {
    region = document.createElement("div");
    region.role = "status";
    region.className = "sr-only";
    document.body.append(region);
  }
  return region;
}

/**
 * Screen readers announce real text changes, so a repeat message (two blocks
 * wrapped in a row) needs the region emptied and rewritten a tick later.
 */
function announce(message: string) {
  const target = statusRegion();
  target.textContent = "";
  clearTimeout(announceTimer);
  announceTimer = window.setTimeout(() => {
    target.textContent = message;
  }, 60);
}
