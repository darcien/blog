---
title: "Q: How do I get % CPU usage of individual service in systemd?"
date: 2023-07-19T00:06:50+07:00
tags: ["til", "linux", "100DaysToOffload"]
draft: true
summary: "A: Use `systemd-cgtop`"
description: "A: Use `systemd-cgtop`"
---

TIL about `systemd-cgtop` from [here](https://superuser.com/questions/1060670/systemd-cpu-usage-of-services)
when trying to debug tailscaled high CPU usage.

`systemd-cgtop` is interactive, but using:
```
systemd-cgtop -c
```
will sort the "control groups" by CPU usage.

Example output:
```
Control Group                                     Tasks   %CPU   Memory  Input/s Output/s
user.slice                                           63    1.1   401.0M        -        -
user.slice/user-1000.slice                           63    1.1   401.0M        -        -
/                                                   153    1.0   413.1M        -        -
user.slice/user-1000.slice/session-1.scope            4    0.8   164.3M        -        -
user.slice/user-1000.slice/session-c1.scope          50    0.4   226.7M        -        -
system.slice                                         34    0.3   174.3M        -        -
system.slice/tailscaled.service                      10    0.1    39.4M        -        -
system.slice/systemd-oomd.service                     1    0.1     1.4M        -        -
system.slice/systemd-journald.service                 1    0.1    45.9M        -        -
dev-hugepages.mount                                   -      -   368.0K        -        -
dev-mqueue.mount                                      -      -     8.0K        -        -
init.scope                                            1      -     5.6M        -        -
sys-fs-fuse-connections.mount                         -      -     8.0K        -        -
sys-kernel-config.mount                               -      -     4.0K        -        -
sys-kernel-debug.mount                                -      -     4.0K        -        -
system.slice/dbus.service                             1      -     2.8M        -        -
system.slice/dev-zram0.swap                           -      -   356.0K        -        -
system.slice/nix-daemon.service                       2      -     4.9M        -        -
system.slice/nscd.service                            11      -     3.5M        -        -
system.slice/sshd.service                             1      -     5.0M        -        -
system.slice/system-getty.slice                       1      -   280.0K        -        -
system.slice/system-getty.slice/getty@tty1.service    1      -   276.0K        -        -
system.slice/system-modprobe.slice                    -      -   724.0K        -        -
system.slice/systemd-logind.service                   1      -     2.0M        -        -
system.slice/systemd-networkd.service                 1      -     3.1M        -        -
system.slice/systemd-resolved.service                 1      -     9.6M        -        -
system.slice/systemd-timesyncd.service                2      -     1.4M        -        -
system.slice/systemd-udevd.service                    1      -    19.5M        -        -
user.slice/user-1000.slice/session-c3.scope           7      -     2.3M        -        -
user.slice/user-1000.slice/user@1000.service          2      -     6.7M        -        -
```

Man page: https://www.freedesktop.org/software/systemd/man/systemd-cgtop.html

---

Post 19 of [#100DaysToOffload](https://100daystooffload.com/).
