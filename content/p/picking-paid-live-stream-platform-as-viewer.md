---
title: "Picking Paid Live Stream Platform as Viewer"
date: 2023-06-17T21:28:02+07:00
tags: ["web", "internet", "note", "100DaysToOffload"]
summary: "Short note comparing between available live stream platform"
showToc: true
---

These are non-exhaustive list of platforms that I've watched on before.
I've included my rough take on each platform and the dates.
Over the time these list might get outdated as the streaming platform keep updating their site.

## eplus

Link: https://ib.eplus.jp

Last watched: 2023-03-18, hololive 4th fes

**Verdict: avoid if possible 👎**

Okay-ish for watching the live stream.
Unuseable for watching the archives.
Getting a bunch of audio issues on the archives like noises and out of sync,
after a while, no audio plays.

## hololive official fanclub (subscribe only with no one time ticket, kinda counts)

Link: https://hololive-fc.com

Last watched: 2023-06-21, variety show with Asaka as guest

**Verdict: decent but no choice on exclusive content 😐**
(Firefox user: bad site 👎)

A relatively new hololive exclusive platform, showed up at early 2022.
Suprisingly decent considering it's their own platform
and doesn't have the same problem with Niconico even though they list Dwango
in the footer[^hololive-fc-dwango].

Their website feels weird though with all commenters' name feels
generated
(2023-06-17: Seems like this is no longer the case, names are no longer bot-like).
And most of the videos views and comments are weirdly exact multiples of thousand.

Also, they stopped supporting Firefox on 2023-05-30[^hololive-fc-firefox].
Which is a sad thing, but not a dealbreaker.

[^hololive-fc-dwango]: https://web.archive.org/web/20230617152311/https://hololive-fc.com/
[^hololive-fc-firefox]: https://web.archive.org/web/20230617155122/https://hololive-fc.com/notification/114

## Niconico (Dwango)

Link: https://live.nicovideo.jp

Last watched: 2023-03-15, Nornis 1st live

**Verdict: video stream quality sucks, archive not included 😭**

Same old nico nico douga but with different name.
Functionally, it's great.
Pratically, I can't like it.

Last time I watched Nornis' live, it's still stutter on lowest stream quality.
I don't know if what's causing it, but Niconico connection to Indo has never
been good regardless of ISP.
Plus, to watch archive (Timeshift in Niconico) you need to subsribe to their
premium service(2023-06-17: cost JPY 550 per month).

## SPWN

Link: https://virtual.spwn.jp

Last watched: 2022-03-20, hololive 3rd fes

**Verdict: pretty safe choice if available 👍**

So far the most platform I've been using and has the least problem with.
From time to time has bad connection to Indo
even after turning on low latency mode on their video player.

## YouTube (member only live, kinda counts)

Link: https://youtube.com

Last watched: pretty much every month

**Verdict: probably the live you want to watch is not here 😔**

It's YouTube.
They probaby have the best infra for running live stream in the world right now.

But they don't run ticketing for one-time watch.

## Z-aN

Link: https://www.zan-live.com

Previously watched: 
- 2023-06-17, Planet Station stage 8
- 2023-08-27, Hololive Splash Party
- 2023-09-03, KOKO 2nd ONE-MAN LIVE "PLAYER II - Kamitsubaki City AREA 4 -"
- 2023-09-13, Blue Journey 1st Live "Yoake no Uta"

**Verdict: great when it's working, but unstable lately 😬**

### Latest impression (2023-09-13)

Watched yet another big event, and there's a blackout mid stream.
No sound, no video.
They said the troubles only last 90s, but it felt like forever[^zan-bj-1-trouble].
With the live comments still running, I saw a lot of frustrated comments.
That makes me feel sad.
It was a theatrical type event and setting the mood was pretty important.
And the blackout ruined the mood buildup for me.

With all the recent troubles, I'm starting to lose faith in Z-aN 🙁

[^zan-bj-1-trouble]: https://web.archive.org/web/20230913181459/https://www.zan-live.com/en/news/333#:~:text=Regarding%20the%20livestream%20of%20Blue%20Journey%201st%20Live%20%22Yoake%20no%20Uta%2C%22%20which%20took%20place%20on%20September%2013%2C%202023%2C%20we%20regret%20to%20inform%20you%20that%20there%20was%20an%20incident%20of%20approximately%201%20minute%20and%2030%20seconds%20of%20disruption%20in%20both%20video%20and%20audio%20due%20to%20equipment%20troubles%2C%20which%20occurred%20at%20around%2019%3A33.%C2%A0


### Previous impression (2023-09-03)

Still my favourite platform, everything from my first impression still applies
(assuming the site isn't down if they're hosting a big event with >100k viewers).
And they even fixed the errors on Firefox.

On 2023-08-26, their site couldn't handle the load from Hololive Splash Party though[^zan-refund].
The live postponed live that day never happened.
It become a recording distributed on YouTube and the live ticket refunded.
I did not expect them to fail that bad.
Live viewers count should be under 200k from my estimates.

Also saw nginx error page from their site that day.
Weird feeling but I feel relaxed after realizing they also use some familiar tech in their stack.

[^zan-refund]: https://web.archive.org/web/20230913181611/https://www.zan-live.com/en/news/328

---

Unrelated to the platform itself but I have to say this:
if you're even remotely interested with the idea of a virtual singer singing
cool songs in a future dystopian world, you need to watch [this live][koko-player-ii].
It's AMAZING and you won't regret it.

[koko-player-ii]: https://www.zan-live.com/en/live/detail/10322

{{< figure
src="/img/zan-koko-player-ii.png"
caption="2023-09-03: KOKO one-man live is just to good I had to forgive Z-aN for their previous failure."
>}}

### First impression (2023-06-17)

First time watched on Z-aN, surprisingly a great platform!
Good to the point it become a trigger for me to make this notes.
From registration flow, payment (it uses Stripe at the moment), stream connection,
archives, even bonus digital goods from buying tickets, this Z-aN tick all the boxes.

### Other issues

~~My only gripe is Z-aN is unusable on Firefox.
Works smoothly on Vivaldi so I have not tried other browsers.~~
They fixed it as of 2023-08-27! Hooray 🥳

{{< figure
src="/img/zan-on-firefox-fail.jpg"
alt="Z-aN video player fail with `The m3u8 file loaded file` error message"
caption="On Firefox, after few mins the video player will error out, needing a page refresh"
>}}

### Trivia

{{< figure
src="/img/zan-date-byte.png"
alt="Showing date input with 'Please enter your date of birth as a single-byte number.' from Z-aN registration flow"
caption="Bonus: Z-aN wants me to enter my date of birth as a single-byte number, I have no idea how to convert a date into a single byte."
>}}


---
## Backstory

Starting to lose track with the many live streaming platform out there.
As these live streams ticket aren't exactly cheap,
I created this note to avoid using the bad ones if possible.
Most of the time there's no choices though.
Even when there are choices, at most it's 2, it's pick bad or the less bad one 🥲.


## Changelog

- 2023-09-13: updated Z-aN entry, issues keep happening
- 2023-09-03: updated Z-aN entry, added KOKO one-man live pic
- 2023-06-17: initial page

---

Post 13 of [#100DaysToOffload](https://100daystooffload.com/).
