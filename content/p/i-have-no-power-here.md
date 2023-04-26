---
title: "I Have No Power Here"
date: 2023-04-26T19:28:39+07:00
tags: ["til", "100DaysToOffload"]
draft: false
summary: "Workout data synced from HealthFit to intervals.icu does not include data that's not supported by Apple Health."
---

I've been using Zwift with a Wahoo Kickr for a while.
But graphs in Zwift isn't fancy enough.
I want ✨fancy✨ graphs like in [intervals.icu](https://intervals.icu/).

So I've been downloading FIT files from Zwift manually,
transfer them to my phone,
and use [HealthFit](https://apps.apple.com/us/app/healthfit/id1202650514) to sync them to other places, including intervals.icu.

Here comes the main topic,
the workout in Zwift always show current power output.
But when I check the workout in intervals.icu, it says no power data 🤔.

I thought it's just FIT file from Zwift doesn't contain the power data when exported.
Turns out that's not the case.
When the exported FIT file is opened using [FIT File Viewer](https://www.fitfileviewer.com/), I can see the power data.
Same thing when the FIT file uploaded to intervals.icu directly, power is there.

So the issue was between HealthFit <-> intervals.icu.
I did a short internet search but couldn't find people with similar issues.
End up sending an email to HealthFit support about this.

The reply got is this:

> From S. Lizeray
>
> ...
>
> Apple Health does not support cycling power, only running power. Hence it can’t be uploaded to the fitness platforms.

Okay, so it's not a HealthFit issue, apparently it is an Apple Health limitation?

I did another search and found some lead:

> [From slizeray](https://forum.intervals.icu/t/healthfit-sync-for-activities-and-health-metrics/2718/35)
>
> HealthFit mirrors Apple Health and Apple Health is the only source of truth for HealthFit.
>
> In addition, power data is not supported in Apple Health, so there is no power data in it.

Hey, this confirms it!

I guess this means I would just stop using HealthFit and upload FIT files directly to intervals.icu if I want to see the power data 🥺.

P.S. Shoutout to Stéphane Lizeray, I'm not sure if this person is a one person army building HealthFit,
but thanks for HealthFit, fast support response, and all the informative replies in intervals.icu forum.

P.S.S. Dear Apple, I wish power data is supported in Apple Health 🙏.

---

Post 11 of [#100DaysToOffload](https://100daystooffload.com/).
