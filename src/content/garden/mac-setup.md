---
title: "Mac Setup"
created: 2025-05-23T23:40:07+10:00
updated: 2026-06-25T21:56:00+10:00
show_toc: true
---

Personal setup for macOS, staying on Sequoia (v15) until Apple realize that liquid glass is stupid.

Unfortunately, work laptop requires latest and greatest version, so some will be marked for Tahoe (v26) only.

## No mouse and keyboard tab can't focus?

Cmd+Opt+F5 -> Motor -> Full Keyboard Access

## macOS Settings

1. General -> Software Update -> Update to latest
2. General -> About -> Name -> rename to unique and easy to remember name
3. General -> Date & Time -> 24-hour time -> turn on
4. Network -> Firewall -> turn on
5. Appearance -> Dark
6. (Tahoe) Appearance -> Liquid Glass -> Tinted
7. Appearance -> Show scroll bars -> Always
8. Appearance -> Theme -> Colour -> Orange (or depends on the mood)
9. Control Center -> Menu Bar Only -> Spotlight -> Don't Show in Menu Bar
10. Desktop & Dock -> Position on screen -> Left (depends on display arrangement)
11. Desktop & Dock -> Automatically hide and show the Dock -> turn on
12. Desktop & Dock -> Tiled windows have margins -> turn off
13. Desktop & Dock -> Mission Control -> Automatically rearrange Spaces based on most recent use -> turn off
14. Displays -> Night Shift... -> Schedule -> Sunset to Sunrise
15. Privacy & Security -> Security -> FileVault -> turn on
16. Keyboard -> Keyboard Shortcuts... -> Input Sources -> Untick all, these conflicts with ctrl + space in code editor
17. Keyboard -> Keyboard Shortcuts... -> Services -> File and Folders -> Tick "New iTerm Tab/Window here" (for opening iTerm2 via Finder context menu)
18. Keyboard -> Keyboard Shortcuts... -> Modifier Keys -> Select keyboard (all keyboards) -> Caps Lock key -> set to Escape
19. Keyboard -> Dictation -> Shortcut -> turn off

## Finder

1. Finder Settings -> Advanced -> When performing a search -> Search the Current Folder

## Software (GUI)

### Firefox

Sign in to existing Firefox account.
Otherwise, import bookmarks and install these add-ons manually:

- 10ten Japanese Reader (Rikaichamp)
- Alt or not
- Bitwarden Password Manager
- Dark Reader
- Disable WebRTC
- Don't Fuck With Paste
- Export Cookies
- I still don't care about cookies
- Link Hints
- Minimal Theme for Twitter / X
- Old Reddit Redirect
- SearXNG
- Stylus
- uBlock Origin
  - [Hide YouTube Shorts List](https://github.com/gijsdev/ublock-hide-yt-shorts)
- Violentmonkey
  - Install personal userscripts as needed - https://github.com/darcien/userscripts/
- YouTube Music Volume Fixer

### Paste

Restore old version from backup.

### iTerm2

- Use macOS text editing shortcuts (e.g. Opt+<-/-> for word jumps), Settings -> Profiles -> Keys -> Key Bindings -> Presets -> Natural Text Editing

For theming, use presets:

```bash
bash -c "$(curl -sLo- https://git.io/vQgMr)"
```

Catppuccin Mocha (number 97)

https://github.com/Gogh-Co/Gogh

### Thunderbird

- (maybe) open Thunder first and close it to ensure profiles dir are created
- Unzip the backup profile
- In `~/Library/thunderbird/Profiles`, replace the `<...>.default-release` with the backup profile
- Open Thunderbird to check if the profile is restored correctly

### Raycast

- Install with cask (raycast) or via website.
- Disable Spotlight keyboard, Settings -> Keyboard -> Keyboard Shortcuts... -> Spotlight -> Show Spotlight search -> turn off
- Replace Raycast shorcut with Cmd+Space
- Hide Raycast menu bar icon
- Do not untick all Spotlight search results, it will break Finder group by kind

## Software (App Store)

- Bitwarden

## Software (CLI)

Setup Homebrow, follow official docs https://brew.sh/

Then follow the readme in the dotfiles https://git.darcien.me/darcien/dotfiles

For personal use, might want to install these additional casks:

```bash
brew install --cask \
iina \
raycast \
zed
```

### Network Troubleshooting

https://fasterdata.es.net/performance-testing/network-troubleshooting-tools/

```
brew install iperf iperf3 nuttcp owamp
```

## Changelog

- 2026-06-25: add Tahoe specific setting
- 2026-06-13: point CLI to dotfiles setup
- 2025-07-15: iTerm2 in finder and disable conflicting shortcuts
- 2025-05-30: add Firefox add-ons
- 2025-05-24: initial version
