---
title: "Silent Tinker"
date: 2026-07-12T11:53:05Z
tags: ["musing"]
---

I have a habit of tinkering.
That includes tinkering with this website.

At this point I feel like I've spent more time tinkering with the scaffolding
than the content itself.
There are so many knobs to play with.
And that includes web server side.

Practically, I doubt it matters.
Personally, it's just exciting seeing that my text is being served over
HTTP/3 and zstd.

But that's it.
Tinker until satisfied, move on.

On one end, I don't want to write a "I migrated from x to y" style article.
I mean, it could be useful, provides unique perspective or justification.
But I am afraid of creating a slop, rehashing the same idea again and again.

On the other end, not writing anything.
Well, the tinkering history is still visible in the commit logs.
But this is a personal website, and the commit does not have the same rigor
as a technical project.
Feeling and reasoning that exists during that time didn't persist.

This writing is the first step to break that status quo.

Hey, I migrated from Hugo to Astro around 5 months ago.
Considered Zola and Eleventy, but ended up with Astro because of the
default templating language.

There's also the image zoom.
I liked the way [Lightense][] handle it.
But it's relatively old, and doesn't play well with modern web features
like `srcset` and `<img sizes="auto" />`[^sizes-auto].
Initially tried popular alternative like `medium-zoom`.
Frankly it's not an improvement and had some issues on Safari.
Revert back to Lightense it is.

Until today.
Existing Lightense usage already had some patch to make it work nicer
with keyboard and focus.
To make the zoom swap cleanly to the full sized image from `srcset`,
easier to craft my own version.

[Lightense]: https://sparanoid.com/work/lightense-images/

[^sizes-auto]:
    I was tinkering on a separate polaroid-style photo viewer.
    And learned about this fancy [`sizes="auto"`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) feature.
    It's very new and has just been shipped in Firefox 150 a few months ago.

Phew, that was a roundabout way of writing.

Separately, at work I also had the same problem of tinkering my own setup.
And never properly shared with the wider group.
Recently I tried to do so, but the result rarely matched my expectation.
I guess I should just keep doing it and train my writing skills.
During this dark period of AI slop, I want to keep my voice and still
have the ability to evoke feelings purely from writings.
