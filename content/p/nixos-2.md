---
title: "Nixos 2"
date: 2023-07-08T02:14:14+07:00
tags: ["nixos", "linux", "100DaysToOffload"]
draft: true
# summary: "summary shown in the post list"
# description: "Desc text shown below title"
# disableHLJS: false
# hideSummary: false
# weight: 1
# aliases: ["/first"]
# searchHidden: true
# showToc: true
# cover:
#     image: "<image path/url>" # image path/url
#     alt: "<alt text>" # alt text
#     caption: "<text>" # display caption under cover
#     relative: false # when using page bundles set this to true
#     hidden: true # only hide on current single page
---


Okay, at this point I know that in NixOS
everything is configured via `/etc/nixos/configuration.nix`.
But what do I need to write in the config?
How do I know what to write?

From here on, my googlefu is being tested again.

## I want zsh

Ez search, there's wiki page for it [here](https://nixos.wiki/wiki/Zsh).
It's kinda crazy now that I think about it.
I can write `programs.zsh.enable = true;`, rebuild, blam, I got zsh as my default.

Next, I want to customize zsh.
I was ready to copy paste my usual `.zshrc`,
but that's not a very Nix way to do it.

The Nix way would be to change the option in the config file.
So how do I know what's the avaiable options?
At the time I had no idea,
so I used GitHub search and try to find .nix file with zsh config for reference.
That worked just fine, I succeded in porting my `.zshrc` to use Nix syntax.

(Later on I learned the existance of [MyNixOS](https://mynixos.com/)
but that's story for another time.)

Next, how do I apply the zsh config to my user only?
Applying it globally is acceptable since I'm the only user.
But it feels dirty since it'll also affect root user.

Onwards! I found out the existance of Home Manager

## Unto the Home Manager

Initially I ignored Home Manager since it has a bit scary warning:

> ### [Words of warning](https://github.com/nix-community/home-manager#words-of-warning)
>
> Unfortunately, it is quite possible to get difficult to understand errors when working with Home Manager. You should therefore be comfortable using the Nix language and the various tools in the Nix ecosystem.
>
> If you are not very familiar with Nix but still want to use Home Manager then you are strongly encouraged to start with a small and very simple configuration and gradually make it more elaborate as you learn.
> 
> ...

Well, I'm new and not familiar with Nix,
let's try it anyway,
what could possibly go wrong?

Yep, I tried following the [install Home Manager as NixOS module](https://nix-community.github.io/home-manager/index.html#sec-install-nixos-module)
and couldn't figure out why rebuild is failing.

After a quick googling, I found this [blog post](https://tech.aufomm.com/my-nixos-journey-home-manager/)
that describes exactly what I want.

This time I followed the steps carefully and...
it worked!

It was the release channel.
I didn't read the manual close enough and just run this:
```zsh
sudo nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager
```
It doesn't work because it's the master branch release channel.
While I'm at 22.11.
So the weird error I'm seeing is from the release channel mismatch.
Rebuild works after I added the correct release channel:
```zsh
sudo nix-channel --add https://github.com/nix-community/home-manager/archive/release-22.11.tar.gz home-manager
```

Okay, I got per user config working.
It's time to add more packages!

## Infinite Packages and Beyond

The fact that I can create separate config file for each package,
have the options isolated,
and config files not spread all over the places is SUPER nice.
I got too used by the usual pattern where I need to read each package
manual to figure out where the config file is located.

Also, the fact that I can declare all the global packages in the config
is nice.

```nix
{ pkgs, ... }: {
  environment.systemPackages = with pkgs; [
    curl
    file
    htop
    lsof
    nixpkgs-fmt
    wget
  ];
}
```

It's not everyday I need to reinstall global packages,
so usually it doesn't matter that much.
But recently I started using [GitHub Codespaces](https://github.com/features/codespaces)
at work.
And since it's a throwaway env, I need to reinstall and reconfigure the packages again.
It would be nice if I have Home Manager in Codepaces,
something to look into later.
Specifying the needed packages in Codepsaces config doesn't work really for
packages that's not used by the whole team since the preinstalled packages
are shared.

---

Post x of [#100DaysToOffload](https://100daystooffload.com/).
