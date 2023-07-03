---
title: "Road to NixOS: The Infection"
date: 2023-07-03T15:46:46Z
tags: ["nixos", "linux", "100DaysToOffload"]
summary: "The start of a journey; migrating a hobby server to NixOS."
---

Disclaimer: This series is not a guide nor a walkthrough for NixOS.
This is intended to be a public notes of my journey here.

## Why?

Indo's goverment announced extended holiday for 28-30 June 2023[^indo-extra-holiday].
This gives me unexpected free time.
So I decided to tinker with NixOS.
Migrating an existing Ubuntu 18 hobby server that has a bunch of services
running in it should be enough learning material.

## Toe Dipping

Before renting a cloud host, I want to try NixOS locally first.
What I tried:

### NixOS on WSL

This kinda work thanks to community effort in [NixOS-WSL](https://github.com/nix-community/NixOS-WSL).
There are plethora of issues stemming from WSL.
Most of them have known workaround,
so I kept trying.
Until docker happened.
I couldn't connect to docker container running in NixOS from Windows.
The maintainer of NixOS-WSL seems to experience the same issue[^wsl-nixos-docker-issue].
I'm not familiar enough with WSL and NixOS to debug this, dropping...

### NixOS as guest VM (VirtualBox)

I have a bunch of ancient Arch Linux VMs here, they all work great.
Then NixOS should work just fine right?
Well yes, until I tried to reboot the NixOS.
Seems like the drive where NixOS is not bootable?
I don't think it's because I used the minimal NixOS image when installing,
instead of using the one with desktop environment included.

I was proven wrong.
After reading the manual again, the minimal image boots into the installer,
not an installed NixOS[^nixos-manual-installation].
Following the manual seems easy enough,
but I doubt it's worth to do on a throwaway VM.

## NixOS-Infect entered the room

> ### What is this?
> 
> A script to install NixOS on non-NixOS hosts.
> 
> NixOS-Infect is so named because of the high likelihood of rendering a system inoperable. Use with extreme caution and preferably only on newly provisioned systems.
>
> https://github.com/elitak/nixos-infect

I stumbled over this when searching around NixOS.
And seeing nixos-infect support the latest LTS Ubuntu (22.04 atm)
on Digital Ocean is trigger to use this instead of VM on my desktop.

So I went ahead and created a new droplet, AMD CPU + 2 GB RAM.
Along this, I also learnt "user data" which can be used to run script
on droplet creation.
Specifically I need the user data to run the infect script.

While waiting for the infect script to finish,
I learnt few tricks like
how to make `less` follow the tail like docker logs[^less-follow-tail].

```bash
less +F /tmp/infect.log
```

By the time I looked at the log again, it is already rebooting,
which is a good sign!

Fast forward few frames...

I tried ssh-ing to the droplet using root user... it worked, I'm in!

From this point, it's all tinkering with the config, learning Nix language, and
a lot of `sudo nixos-rebuild switch`.

## Closing Thoughts

I'm writing this from the NixOS droplet.
So far I'm really happy with the result.

Years ago I set up Arch Linux on a bunch of old laptops and desktops but didn't
write anything after it.
This time I'm determined to leave some notes on the new journey.

Next post is about making the NixOS more sane as dev environment!

---

Post 17 of [#100DaysToOffload](https://100daystooffload.com/).

---

[^indo-extra-holiday]: https://web.archive.org/web/20230703173600/https://en.tempo.co/read/1739780/govt-announces-2-eid-al-adha-joint-leave-days-jokowi-confirms
[^wsl-nixos-docker-issue]: https://github.com/nix-community/NixOS-WSL/issues/235#issuecomment-1575977960
[^nixos-manual-installation]: https://nixos.org/manual/nixos/stable/index.html#sec-installation-manual
[^less-follow-tail]: https://unix.stackexchange.com/a/474
