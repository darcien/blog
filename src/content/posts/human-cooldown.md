---
title: "Human Cooldown"
date: 2026-05-29T12:40:16Z
tags: ["musing", "uv"]
---

I'm so glad `uv` exists.
Without it, I probably wouldn't want to touch any Python project.
It even supports dependency cooldown via [`exclude-newer`][exclude-newer].

[exclude-newer]: https://docs.astral.sh/uv/reference/settings/#exclude-newer

I had mine set to:

```toml
exclude-newer = "3 days"
```

It works just fine if I want to install or run some standalone packages.
Works great too on some small projects.

But all hell breaks loose in a big project with massive dependencies,
especially those with many platform-specific wheels.

For example, I tried to run `unsloth` from [source][unsloth].

[unsloth]: https://github.com/unslothai/unsloth

```shell
$ ./install.sh --local
...
      we can conclude that all of:
          torch>=2.4.0,<2.4.0+cpu
          torch>2.4.0+cpu,<2.4.1+cpu
          torch>2.4.1+cpu,<2.5.0+cpu
          torch>2.5.0+cpu,<2.5.1+cpu
          torch>2.5.1+cpu,<2.6.0+cpu
          torch>2.6.0+cpu,<2.7.0+cpu
          torch>2.7.0+cpu,<2.7.1+cpu
          torch>2.7.1+cpu,<2.8.0+cpu
          torch>2.8.0+cpu,<2.9.0+cpu
          torch>2.9.0+cpu,<2.9.1+cpu
          torch>2.9.1+cpu,<2.10.0+cpu
       cannot be used.
      And because all of:
          torch==2.4.0+cpu
          torch==2.4.1+cpu
          torch==2.5.0+cpu
          torch==2.5.1+cpu
          torch==2.6.0+cpu
          torch==2.7.0+cpu
          torch==2.7.1+cpu
          torch==2.8.0+cpu
          torch==2.9.0+cpu
          torch==2.9.1+cpu
          torch==2.10.0+cpu
       have no wheels with a matching platform tag (e.g., `macosx_15_0_arm64`) and you require torch>=2.4,<2.11.0, we can conclude that your requirements are unsatisfiable.

hint: `filelock` was filtered by `exclude-newer` to only include packages uploaded before 2026-05-26T12:29:09.7623Z. The latest version satisfying the requirement is v3.29.0. Consider using `exclude-newer-package` to override the cutoff for this package.
hint: Wheels are available for `torch` (v2.10.0+cpu) on the following platforms: `manylinux_2_28_aarch64`, `manylinux_2_28_x86_64`, `linux_aarch64`, `linux_s390x`, `win_amd64`, `win_arm64`
```

Uhh, cool?

I can't even see the full output, it's way past my terminal scrollback.
Time to rerun with output redirected.

```shell
$ wc -l install_output.log
    6226 install_output.log
```

Nice, a numeric palindrome.

But the content doesn't look nice.

```log
warning: fsspec-2026.4.0.tar.gz is missing an upload date, but user provided: 2026-05-26T08:58:54.140622Z
warning: fsspec-2026.4.0-py3-none-any.whl is missing an upload date, but user provided: 2026-05-26T08:58:54.140622Z
warning: fsspec-2026.3.0.tar.gz is missing an upload date, but user provided: 2026-05-26T08:58:54.140622Z
warning: fsspec-2026.3.0-py3-none-any.whl is missing an upload date, but user provided: 2026-05-26T08:58:54.140622Z
warning: fsspec-2026.2.0.tar.gz is missing an upload date, but user provided: 2026-05-26T08:58:54.140622Z
warning: fsspec-2026.2.0-py3-none-any.whl is missing an upload date, but user provided: 2026-05-26T08:58:54.140622Z
warning: fsspec-2026.1.0.tar.gz is missing an upload date, but user provided: 2026-05-26T08:58:54.140622Z
```

```shell
$ rg -co "missing an upload date, but user provided" install_output.log
6127
```

Hohoho, that's a lot of missing dates.
Do I even need all that?

After a little bit of digging and back-and-forth, maybe `--no-torch` is worth trying.

```shell
$ ./install.sh --local --no-torch

  🦥 Unsloth Studio Installer
  ────────────────────────────────────────────────────

  platform       macos
  deps           all system dependencies found
                 preserving existing environment for rollback...
                 previous environment preserved for rollback
  venv           creating Python 3.13 virtual environment
                 /Users/darcien/.unsloth/studio/unsloth_studio
  WARNING: Python 3.13.8 has a known torch import bug.
  Recreating venv with Python 3.12...
  venv           using environment
                 /Users/darcien/.unsloth/studio/unsloth_studio
                 skipping PyTorch (--no-torch or Intel Mac x86_64).
                 installing unsloth (this may take a few minutes)...
  error          install unsloth (no-torch) failed (exit code 1)
Using Python 3.12.13 environment at: /Users/darcien/.unsloth/studio/unsloth_studio
  × No solution found when resolving dependencies:
  ╰─▶ Because only unsloth<=2026.5.7 is available and you require unsloth>=2026.5.8, we can conclude that your requirements are unsatisfiable.

hint: `unsloth` was filtered by `exclude-newer` to only include packages uploaded before 2026-05-26T13:00:47.380154Z. The latest version satisfying the requirement is v2026.5.8, published at 2026-05-26T14:32:18.406Z. Consider using `exclude-newer-package` to override the cutoff for this package.                 restoring previous environment after failed install...
                 restored previous environment
```

Aha, at least now the output fits in my screen.

Wait a minute.
The 3 days cooldown from my config resolves to `2026-05-26T13:00:47.380154Z`,
and the project tries to install `2026-05-26T14:32:18.406Z` for `unsloth`.

That's a 1.5-hour difference!
Glad to see the cooldown is working as expected.
It would be funny if the difference were much less and the install worked
on a second run.

Hey, normally I probably would push forward.
Reduce the cooldown and try to unblock myself to feed my ego.

But nah, let's not do that.
It's Friday night, time to stop and relax.
If dependencies can get a cooldown, can I get some too?
