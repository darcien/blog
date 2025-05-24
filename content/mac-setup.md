---
title: "Mac Setup"
date: 2025-05-23T23:40:07+10:00
draft: true
---

## No mouse and keyboard tab can't focus?

Cmd+Opt+F5 -> Motor -> Full Keyboard Access

## macOS Settings

1. General -> Software Update -> Update to latest
2. General -> About -> Name -> rename to unique and easy to remember name
3. General -> Date & Time -> 24-hour time -> turn on
4. Network -> Firewall -> turn on
5. Appearance -> Show scroll bars -> Always
6. Control Center -> Menu Bar Only -> Spotlight -> Don't Show in Menu Bar
7. Desktop & Dock -> Position on screen -> Left (or Right, depends on display arrangement)
8. Desktop & Dock -> Automatically hide and show the Dock -> turn on
9. Desktop & Dock -> Tiled windows have margins -> turn off
10. Desktop & Dock -> Mission Control -> Automatically rearrange Spaces based on most recent use -> turn off
11. Displays -> Night Shift... -> Schedule -> Sunset to Sunrise
12. Privacy & Security -> Security -> FileVault -> turn on
13. Keyboard -> Keyboard Shortcuts... -> Modifier Keys -> Select keyboard (all keyboards) -> Caps Lock key -> set to Escape
14. Keyboard -> Dictation -> Shortcut -> turn off

## Finder

1. Finder Settings -> Advanced -> When performing a search -> Search the Current Folder

## Software (GUI)

### Firefox

TODO

### Paste

Restore old version from backup.

### iTerm2

#### Theming

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

### Homebrew

https://brew.sh/

```bash
brew install \
bat \
btop \
doggo \
fnm \
gh \
git \
jesseduffield/lazydocker/lazydocker \
jesseduffield/lazygit/lazygit \
just \
lsd \
mcfly \
micro \
starship \
tlrc
```

```bash
brew install --cask \
font-fantasque-sans-mono-nerd-font \
raycast \
zed
```

### zsh

https://github.com/darcien/dotfiles/blob/master/.zshrc

### Network Troubleshooting

https://fasterdata.es.net/performance-testing/network-troubleshooting-tools/

```
brew install iperf iperf3 nuttcp owamp
```

## Changelog

- 2025-05-24: initial version
