---
title: "Lightense is pretty cool"
date: 2023-09-04T23:32:45+07:00
tags: ["hugo", "shortcodes", "100DaysToOffload"]
draft: false
summary: "I finally added image zoom functionality here."
---

---

TL;DR I created yet another `figure` Hugo shortcode that can be zoomed in by tapping on
and can be resized at build time with `resize` parameter.

---

## Where is the code?

Here, put it in `layouts/shortcodes/figure.html`.
```html
{{- $src := .Get "src" -}}

{{- $imgFromPage := $.Page.Resources.GetMatch $src -}}
{{- $imgFromGlobal := resources.Get $src -}}

{{ if $imgFromPage | or $imgFromGlobal }}
  {{ $img := $imgFromPage | or $imgFromGlobal }}

  {{ $img := cond (isset .Params "resize") ($img.Resize (.Get "resize" | default "1x1")) $img }}

  <figure>
    {{- $caption := trim (.Get "caption") "\n" -}}
    <img
      loading="lazy" src="{{ $img.RelPermalink }}"
      {{/* If alt or caption is specified, use it as alt text. */}}
      {{- if or (.Get "alt") $caption }}
      alt="{{ with .Get "alt" }}{{ . }}{{ else }}{{ $caption | markdownify | plainify }}{{ end }}"
      {{- end -}}
    >
  
    {{- if $caption -}}
      <figcaption>
        {{/* The extra <p> is intentional. */}}
        {{/* Otherwise different style for figure title is used. */}}
        {{/* Right now caption won't support title or link here. */}}
        <p>
          {{- $caption | markdownify -}}
        </p>
      </figcaption>
    {{- end }}
  
  </figure>

{{- else -}}
{{- errorf "figure: image '%s' must be an existing page or global resource!" $src -}}
{{- end -}}

{{- if not (.Page.Scratch.Get "lightenseLoaded") -}}
  {{- .Page.Scratch.Set "lightenseLoaded" true -}}
  <script defer src="https://cdn.jsdelivr.net/npm/lightense-images@1.0.17/dist/lightense.min.js" integrity="sha256-0L7PA+rlAMaq+Gkzls+i1cUvY9i7D+XF/Yl3BhYKABo=" crossorigin="anonymous"></script>
  <script defer type="text/javascript">
    window.addEventListener("load", function() {
      Lightense('img:not(.no-lightense, [aria-label="logo"])', {
        // Override the bg color behind the overlayed image when lightbox is opened.
        // Using secondary value from theme with high opacity to make it work with
        // both light and dark mode because we don't have access to theme variable here.
        background: 'rgb(155, 156, 157 / 60%)',
      });
    }, false);
  </script>
{{- end -}}
```

## Do you have some examples to play with?

Sure, here are some cat photo I took and other random things.

{{< figure
 src="cat.jpg"
 caption="A cat I saw when I went to the company trip."
 alt="Cute cat sitting on chair."
>}}

{{< figure
 src="bogor.jpg"
 caption=`
One word, green. Behind the iron fence there is a river not visible in the photo.
Also resized down to height=360px.`
resize="x360"
>}}

{{< figure
 src="img/shiromedia-penguin-front.jpg"
 caption=`
This figure use global resource.
The shortcode can handle both page and global resource.
I don't understand why Hugo don't have this out of the box.`
resize="x640"
>}}

## But why?

I like looking at a picture on full window size without opening in new tab
or manually zooming in the website.

## Really?

Okay, the other part is because I saw the same thing on someone's blog[^carlos-blog],
and thought it was pretty cool.
Seems like that blog is also built with [Hugo][hugo] but I couldn't figure out
what theme is being used.

[^carlos-blog]: Carlos' blog, he's a cool person; https://carlosbecker.com/

After few minutes and one DevTools later, their zoomable image is powered by
[Lightense][lightense]. And after bruteforcing my way through GitHub code search,
I found out the theme being used.
It's [Menca][menca], a paid theme by AnvodStudio.

[hugo]: https://gohugo.io/
[lightense]: https://sparanoid.com/work/lightense-images/
[menca]: https://themeforest.net/item/menca-modern-personal-blogging-theme-for-hugo/34443213#

Aww shucks, I did not expect it to be a paid theme.
But it is a good theme, so I can understand it might worth 49 USD for some people.

And now, here I am.
After recreated the zoomable image part of Menca theme.
Feeling satisfied.

## Okay, maybe a bit of rant

During the making, I spent more time trying to figure out how to do x with Hugo.
It was painful.

Now I know that in Hugo I can't:
- set variable value from condionals to outside context
- set variable value from condionals to outside context
- set variable value from condionals to outside context
- ternary for setting variable value
- short circuit logic

Yes I mentioned the same thing 3 times.
It's painful enough that I can't do:
```js
// This is JS syntax for example
let foo
if (x) {
  // This doesn't work in Hugo:
  foo = doSomething(x)
  // What Hugo does is more like this,
  // it creates a new variable in the current scope.
  // And the variable in the parent scope is untouched.
  let foo = doSomething(x)
}
```

And having no ternary here is like rubbing salt on the wounds.

```js
// In JS I would write something like this
img = resize ? img.resizeTo(resize) : img

// But I had to write it like this
let truthy = img.resizeTo(resize || '1x1')
let falsy = img
img = cond(isSet(params, "resize"), truthy, falsy) 

// Actual Hugo template code:
// {{ $img := cond (isset .Params "resize") ($img.Resize (.Get "resize" | default "1x1")) $img }}
```

I know it's probably not Hugo's fault.
I feel like hitting the limit of templating syntax.
But I like writing in markdown with a small sprinkles of dynamic code here in there.

I should explore more in this area, maybe there's already something out there for me.
Just waiting to be found...

---

Post 20 of [#100DaysToOffload](https://100daystooffload.com/).
