---
title: "Who used my codespace?"
date: 2024-03-24T19:04:24+07:00
tags: ["codespace", "github", "100DaysToOffload"]
summary: "A wild diff appeared!"
---

It was another normal day at work.
I finished up my lunch and returning to work.
I booted up my [GitHub codespace][gh-codespace] as usual.

[gh-codespace]: https://docs.github.com/en/codespaces/overview

I have a habit of running `git status` before doing anything.
Even though I know I have not done any changes yet.

This time it's different though.
Hmm, why there are diff?
And these are unfamiliar files.
There's also commented out code in the diffs.
Seems like a WIP code?

I'm pretty sure codespace is a per user thing.
There's no built in feature to use other users codespace.


Anyway, I asked in the big engineering group:

> me: Did someone use my codespace during lunch?
> 
> engineer 1: How did that happen!?
> 
> engineer 2: Hey, that's my code!
> 
> engineer 3: Ooh, somehow I got the same diff in mine.
> 
> (Wait what? There are others?)

No one has ideas on the cause.
We end up opening a support ticket to GitHub.

I didn't hear any replies yet from support.
So this mystery will stay unsolved for a while.

I couldn't find similar issue being reported in the internet.
Maybe this is just a rare happening when different codespaces
mistakenly got allocated the same working directory? 🤔

---

Post 23 of [#100DaysToOffload](https://100daystooffload.com/).
