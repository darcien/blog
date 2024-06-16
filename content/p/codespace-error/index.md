---
title: "Error, Loneliness and Codespace"
date: 2024-06-15T22:49:03+07:00
tags: ["codespace", "github", "100DaysToOffload"]
summary: "Collection of codespace errors."
---

I've been working using [Codespaces][gh-codespace] long enough
that I start seeing various undocumented and bizarre errors.

[gh-codespace]: https://github.com/features/codespaces

At some point, I started collecting these errors as war trophies.
(Albeit most of the time, I lost the battle and just created new codespace
instead of fixing it.)

## Trophies

{{< figure
 src="already-running.png"
 caption="I have no idea what's happening with the connectivity. Using a different codespace connects just fine. Rarity: SSR. Solution: New codespace."
>}}

{{< figure
 src="deadline-exceeded.png"
 caption="Great, now my codespace also reminds me that I exceeded the card deadline, thanks. Rarity: SSR. Solution: New codespace."
>}}

{{< figure
 src="read-only-fs.png"
 caption="Somehow this codespace disk is mounted as read-only. Rarity: SSR. Solution: New codespace."
>}}

{{< figure
 src="rebuilding-stuck.png"
 caption="Sometimes full rebuild is the solution. Sometimes rebuild is also the issue. This one stuck on rebuilding for at least 30 mins... Rarity: SR. Solution: New codespace."
>}}

{{< figure
 src="recovery-mode.png"
 caption="Recovery mode is part of my daily routine at this point. Rarity: N. Solution: Rebuild or new codespace."
>}}

{{< figure
 src="terminated.png"
 caption="Something failed and I have no idea what is it. Rarity: SSR. Solution: Reload or reconnect."
>}}


## What's with the rarity?

I'm trying to categorize the error by rarity.
Some of them are so rare and fleeting that I've only saw them once in my life.

Rarities from the most common to the rarest:

- N - normal, encountered daily, nothing special.
- R - rare, maybe once a week.
- SR - super rare, ohh I've seen this before months ago.
- SSR - super super rare, hey have you seen this before - no what the heck is that!?


## Changelog

- 2024-06-15: initial version

---

Post 24 of [#100DaysToOffload](https://100daystooffload.com/).
