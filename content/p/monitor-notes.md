---
title: "Monitor Notes"
date: 2021-12-06T19:18:21+07:00
tags: ["note"]
summary: "A diary of boring adventure in setting up monitors. Also works as a timecapsule letter, dear future me, don't repeat these mistakes."
showToc: true
---

## Monitors Used

- Dell U2417H [24" 60Hz IPS Monitor]
- ViewSonic XG2431 [24" 240Hz IPS Monitor]

## MacOS + ViewSonic Issues

Can't use random USB-C cable + USB hub for connecting ViewSonic to M1 MacBook Air running Big Sur.

Mac detected the monitor, but monitor show "no signal".

Maybe cable or hub issue? Used the same exact cable and hub with different monitor, worked.

Maybe monitor port issue? Used same HDMI port with Windows desktop, worked.

Then I found this review on [Amazon](https://www.amazon.com/review/R19FF79H8JO7G9/ref=cm_cr_srp_d_rdp_perm?ie=UTF8&ASIN=B07JVKS8JQ) for different ViewSonic model:

> Other reviewers here have noted all the pros about this monitor, I will just add that 1-) the adjustable stand is especially easy to use and useful for long hours and avoiding neck pain and 2-) reminder that they ship only a display port/USB cable and an HDMI cable with it even though monitor is USB -C enabled. if you are running Mojave 10.14 or later the adapters for display port and HDMI simply will not work, the mac book will never see the monitor. You _must_ get a USB-C 3.1 to C cable. Then you can just plug it all in. Also need to add a shout out to Anne at Amazon (complimentary) tech support for helping figure all this out by coordinating with ViewSonic because it wasn't documented anywhere at the point at which I was trying to do it. Thank you Anne!
>
> - bookkook, 2019 March

Hey, that problem sounds familiar.

So I just learned there's a lot of USB-C variant, and USB-C 3.1 gen 2 is a thing.

Currently ordering a new cable, will update later.

Update: It's 2022 and I bought a new cable.

It's [HDMI to USB-C from Vention](https://www.ventioncable.com/product/usb-c-to-hdmi-cable-2/).
Surprise! It worked! I'll skip the story of the package courier miss-deliver the cable and I had to buy it twice.

After using it a full day without problems, I realized a fatal miss when it's time to charge the laptop.
Macbook air only have 2 USB-C ports! 1 for monitor, and the other one for USB hub, this is for keyboard etc. and I can't work without it.

Okay, back to square one. I tried rummaging through my jumbled mess cable collection and found a HDMI to HDMI cable.
Not sure where it's from, maybe from Nintendo Switch.
It looks exactly like your average HDMI cable, and it's pretty old, but there's no harm in trying it right?

Another surprise! I have zero idea why, but connecting that old HDMI cable to the USB Hub and it worked! Mac could properly detect the monitor now.
The only thing I can identify from the cable is E202584 AWM from a company called Linkiss.

In a way, I wasted a total of IDR 319K for unused cables and few hours to look into the cause.
What I learnt from this:

- I have no idea how HDMI works
- I have even less idea how USB C works

## Windows + Monitors with Mixed HDR Mode

Windows 10 with multi-monitor, but only some of them have support HDR.

If HDR is enabled on supported monitors, this will break preview feature from Windows on non-HDR monitor. E.g. win+tab will show black desktop and windows, hovering on running program from taskbar will show black window instead of actual preview.

Solution, turn off HDR :(
