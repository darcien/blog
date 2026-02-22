---
title: "Debian Setup"
date: 2026-02-16T20:54:00+10:00
showToc: true
---

Setup for Debian VPS.

Tested on:
- Debian 13 on BinaryLane

## Invalid locale warning

```
-bash: warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8): No such file or directory
_____________________________________________________________________
WARNING! Your environment specifies an invalid locale.
 The unknown environment variables are:
   LC_CTYPE=en_US.UTF-8 LC_MESSAGES=en_US.UTF-8 LC_ALL=en_US.UTF-8
 This can affect your user experience significantly, including the
 ability to manage packages. You may install the locales by running:

 sudo dpkg-reconfigure locales

 and select the missing language. Alternatively, you can install the
 locales-all package:

 sudo apt-get install locales-all

To disable this message for all users, run:
   sudo touch /var/lib/cloud/instance/locale-check.skip
_____________________________________________________________________

-bash: warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8): No such file or directory
-bash: warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8): No such file or directory
```

ELI5: Your client is asking locale not installed in the debian.

Install it as directed:
```bash
sudo dpkg-reconfigure locales
```

## No regular user in machine (root only)

Setup a passwordless user, create new user and add it to sudoers:

```bash
adduser --disabled-password darcien
usermod -aG sudo darcien
```

```bash
visudo -f /etc/sudoers.d/darcien
```

Put this in the file then save.
```
darcien ALL=(ALL) NOPASSWD: ALL
```

Duplicate the root SSH key to the regular user so regular user can
authenticate SSH with key. (or create different key for regular user)

```bash
cp -r /root/.ssh /home/darcien/
chown -R darcien:darcien /home/darcien/.ssh
chmod 700 /home/darcien/.ssh
chmod 600 /home/darcien/.ssh/authorized_keys
```

Test the ssh as regular user
```bash
ssh -v darcien@<server>
```

## Hardening SSH

Check ssh version in the server
```bash
sshd -V
# or ssh if no sshd from regular user
ssh -V
```

Should be newer than 6.7, then we can apply [modern config](https://infosec.mozilla.org/guidelines/openssh.html).

Modify the server ssh config as needed:
```bash
nano /etc/ssh/sshd_config
```

> [!WARNING]
> Only disable root ssh login after confirming regular user + sudo works.

```
# Supported HostKey algorithms by order of preference.
HostKey /etc/ssh/ssh_host_ed25519_key
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key

KexAlgorithms curve25519-sha256@libssh.org,ecdh-sha2-nistp521,ecdh-sha2-nistp384,ecdh-sha2-nistp256,diffie-hellman-group-exchange-sha256

Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr

MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,umac-128-etm@openssh.com,hmac-sha2-512,hmac-sha2-256,umac-128@openssh.com

# Password based logins are disabled - only public key based logins are allowed.
AuthenticationMethods publickey

# LogLevel VERBOSE logs user's key fingerprint on login. Needed to have a clear audit track of which key was using to log in.
LogLevel VERBOSE

# Log sftp level file access (read/write/etc.) that would not be easily logged otherwise.
Subsystem sftp  /usr/lib/ssh/sftp-server -f AUTHPRIV -l INFO

# Root login is not allowed for auditing reasons. This is because it's difficult to track which process belongs to which root user:
#
# On Linux, user sessions are tracking using a kernel-side session id, however, this session id is not recorded by OpenSSH.
# Additionally, only tools such as systemd and auditd record the process session id.
# On other OSes, the user session id is not necessarily recorded at all kernel-side.
# Using regular users in combination with /bin/su or /usr/bin/sudo ensure a clear audit track.
PermitRootLogin No
```

Any ssh config change:
```bash
# Validate new config
sshd -t

# Restart server to apply changes
systemctl restart sshd
```

## Tailscale

Once SSH server is hardened, install Tailscale + setup Tailscale SSH
to minimise the key needed to SSH into the machine from different devices.

See [linux install guide](https://tailscale.com/docs/install/linux).

It probably looks like:

```bash
# Add Tailscale's GPG key
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkgs.tailscale.com/stable/debian/trixie.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
# Add the tailscale repository
curl -fsSL https://pkgs.tailscale.com/stable/debian/trixie.tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list
# Install Tailscale
sudo apt-get update && sudo apt-get install tailscale
# Start Tailscale!
sudo tailscale up
```

Then enable Tailscale SSH:

```bash
tailscale set --ssh
```

Then test SSH from existing Tailscale device:
```bash
ssh -v <device-name>
```

Debug logs contain this:
```
debug1: Remote protocol version 2.0, remote software version Tailscale
```

And it should output:
```
# Tailscale SSH requires an additional check.
# To authenticate, visit: https://login.tailscale.com/a/<blah>
```

SSO with Tailscale, then you should be logged in.

Disable Tailscale key expiry if this is a permanent machine.

## Eternal Terminal (et)

See https://eternalterminal.dev/download/

```bash
echo "deb [signed-by=/etc/apt/keyrings/et.gpg] https://mistertea.github.io/debian-et/debian-source/ $(grep VERSION_CODENAME /etc/os-release | cut -d= -f2) main" | sudo tee -a /etc/apt/sources.list.d/et.list
curl -sSL https://github.com/MisterTea/debian-et/raw/master/et.gpg | sudo tee /etc/apt/keyrings/et.gpg >/dev/null
sudo apt update
sudo apt install et
```

Make sure the default et port (2022) is not blocked.

## Zsh + Git etc.

In case the debian is super slim

Need these for homebrew + chezmoi + dotfiles.

```bash
sudo apt-get install git jq rsync unzip zsh
```

Change default shell to zsh (yes, needs sudo because chsh needs to authenticate
the user, but the regular user is passwordless)
```bash
sudo chsh -s $(which zsh) darcien
```

## Homebrew on Linux

Yes, [Homebrew](https://docs.brew.sh/Homebrew-on-Linux).

```bash
# Usually these are already installed
sudo apt-get install build-essential procps curl file git

# Same installation script but pipe from echo to avoid prompt
echo | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Installing utilities + dotfiles

See [dotfiles](https://github.com/darcien/dotfiles) for details.

```bash
brew install chezmoi
chezmoi init --repo git@github.com:darcien/dotfiles.git
chezmoi apply
```

## Angie (web server)

- [Angie docs](https://en.angie.software/angie/docs/)
- [Debian installation](https://en.angie.software/angie/docs/installation/oss_packages/#install-deb-oss)

Follow the official setup above, then install:

```bash
sudo apt-get install -y angie

# Install extra modules
sudo apt-get install -y angie-module-brotli angie-module-zstd
```

## Swap

Create 1 GB swap file if machine has no swap by default

```bash
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## Changelog

- 2026-02-22: add et
- 2026-02-16: initial version
