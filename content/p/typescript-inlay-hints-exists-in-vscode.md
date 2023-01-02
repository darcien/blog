---
title: "TypeScript Inlay Hints Exists in VSCode"
date: 2023-01-02T17:16:53+07:00
tags: ["til", "typscript", "100DaysToOffload"]
draft: false
summary: "First TIL of 2023"
---

TIL inlay hints for TypeScript already exists on VSCode[^ts-inlay-hints].
I thought it was a Deno only thing[^deno-inlay-hints].

First time I saw inlay hints was on a Rust codebase few years ago[^rust-inlay-hints].
Initially I thought it was annoying, pushing unfinished code around with hints.

But now, after spending few days with inlay hints enabled by default on a Deno codebase,
I love inlay hints[^deno-inlay-hints-enabled-by-default]!
It's like my dream of named args in TS came true[^ts-named-args][^reasonml-named-args].

Sure using object destructure kinda works as a workaround.
But there are times where the function is coming from a 3rd party SDK or used in hundred different places.
And it was really hard to read and understand all those pesky inline booleans.

From today, those issues are no longer a thing!
{{< figure
src="/img/til-inlay-hint.png"
alt="Comparison of TS inlay hints off vs on."
caption="Comparison of TS inlay hints turned off vs on. Left is off; right is on."
position="center"
style="border-radius: 8px;" >}}
These inlay hints settings are configured under `typescript.inlayHints.*` in the `settings.json`.

---

Post 9 of [#100DaysToOffload](https://100daystooffload.com/).

---

[^ts-inlay-hints]: https://code.visualstudio.com/docs/typescript/typescript-editing#_inlay-hints
[^rust-inlay-hints]: https://rust-analyzer.github.io/manual.html#inlay-hints
[^deno-inlay-hints]: https://deno.com/blog/v1.27#inlay-hints
[^deno-inlay-hints-enabled-by-default]: https://deno.com/blog/v1.29#inlay-hints-are-enabled-by-default-in-vscode-extension
[^ts-named-args]: https://github.com/microsoft/TypeScript/issues/467
[^reasonml-named-args]: https://reasonml.github.io/docs/en/function#named-arguments
