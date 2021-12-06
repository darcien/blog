+++
title = "Multi Monitor Setup"
date = "2021-12-06T19:18:21+07:00"
authorTwitter = "darcien_" #do not include @
tags = ["setup"]
keywords = ["monitor"]
description = "Daily life with more than 1 monitors"
draft = true
+++


## Monitors Used

- Dell U2417H [24" 60Hz IPS Monitor]
- ViewSonic XG2431 [24" 240Hz IPS Monitor]

## MacOS + ViewSonic Issues

Can't use random USB-C cable + USB hub for connecting ViewSonic to M1 MacBook Air running Big Sur.

Mac detected the monitor, but monitor show "no signal".

Maybe cable or hub issue? Used the same exact cable and hub with different monitor, worked.

Maybe monitor port issue? Used same HDMI port with Windows desktop, worked.

Then I found this review on [Amazon](https://www.amazon.com/review/R19FF79H8JO7G9/ref=cm_cr_srp_d_rdp_perm?ie=UTF8&ASIN=B07JVKS8JQ) for different ViewSonic model:

> Other reviewers here have noted all the pros about this monitor, I will just add that 1-) the adjustable stand is especially easy to use and useful for long hours and avoiding neck pain and 2-) reminder that they ship only a display port/USB cable and an HDMI cable with it even though monitor is USB -C enabled. if you are running Mojave 10.14 or later the adapters for display port and HDMI simply will not work, the mac book will never see the monitor. You *must* get a USB-C 3.1 to C cable. Then you can just plug it all in. Also need to add a shout out to Anne at Amazon (complimentary) tech support for helping figure all this out by coordinating with ViewSonic because it wasn't documented anywhere at the point at which I was trying to do it. Thank you Anne! 
> - bookkook, 2019 March

Hey, that problem sounds familiar.

So I just learned there's a lot of USB-C variant, and USB-C 3.1 gen 2 is a thing.

Currently ordering a new cable, will update later.

## Windows + Monitors with Mixed HDR Mode

Windows 10 with multi-monitor, but only some of them have support HDR.

If HDR is enabled on supported monitors, this will break preview feature from Windows on non-HDR monitor. E.g. win+tab will show black desktop and windows, hovering on running program from taskbar will show black window instead of actual preview.

Solution, turn off HDR...
