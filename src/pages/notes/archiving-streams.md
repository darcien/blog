---
layout: ../../layouts/Note.astro
title: "Archiving Streams"
created: 2026-04-18
show_toc: true
---

Notes around how to archive live streams.

## Zaiko

> Last tried 2026-04-18: works. yt-dlp version nightly@2026.04.10.235301

Zaiko extractor is currently broken.
Open issue [here](https://github.com/yt-dlp/yt-dlp/issues/16157).

```shell
❯ yt-dlp_macos --cookies-from-browser firefox -i -v 'https://zaiko.io/event/381281/stream/195982/167040'
[debug] Command-line config: ['--cookies-from-browser', 'firefox', '-i', '-v', 'https://zaiko.io/event/381281/stream/195982/167040']
[debug] Encodings: locale UTF-8, fs utf-8, pref UTF-8, out utf-8, error utf-8, screen utf-8
[debug] yt-dlp version nightly@2026.04.10.235301 from yt-dlp/yt-dlp-nightly-builds [2c28ee5d7] (darwin_exe)
[debug] Python 3.14.3 (CPython arm64 64bit) - macOS-15.7.4-arm64-arm-64bit-Mach-O (OpenSSL 3.0.18 30 Sep 2025)
[debug] exe versions: ffmpeg 8.1 (setts), ffprobe 8.1
[debug] Optional libraries: Cryptodome-3.23.0, brotli-1.2.0, certifi-2026.02.25, curl_cffi-0.15.0, mutagen-1.47.0, requests-2.33.0, sqlite3-3.50.4, urllib3-2.6.3, websockets-16.0, yt_dlp_ejs-0.8.0
[debug] JS runtimes: deno-2.6.8
[debug] Proxy map: {}
Extracting cookies from firefox
[debug] Extracting cookies from: "/Users/darcien/Library/Application Support/Firefox/Profiles/lqkzu9p1.default-release/cookies.sqlite"
[debug] Firefox cookies database version: 17
Extracted 704 cookies from firefox
[debug] Request Handlers: urllib, requests, websockets, curl_cffi
[debug] Plugin directories: none
[debug] Loaded 1864 extractors
[Zaiko] Extracting URL: https://zaiko.io/event/381281/stream/195982/167040
[Zaiko] 381281: Downloading webpage
[Zaiko] 381281: Downloading player page
ERROR: 381281: An extractor error has occurred. (caused by KeyError('jwt_token_url')); please report this issue on  https://github.com/yt-dlp/yt-dlp/issues?q= , filling out the appropriate issue template. Confirm you are on the latest version using  yt-dlp -U
  File "yt_dlp/extractor/common.py", line 765, in extract
  File "yt_dlp/extractor/zaiko.py", line 87, in _real_extract
KeyError: 'jwt_token_url'
```

For the extractor issue, there's an open PR, either build from the PR or
extract the URL manually. I'm doing the manual way here.

Open browser network inspector tool, and load the stream viewing page.

Find the requests that return the actual streaming,
either the main index that list all the available bandwidth or a specific one.

Usually it's:

- cloudfront.net CDN,
- file type `application/x-mpegURL` (.m3u8),
- has JWT in the URL (eyJ...)

The main index response probably look like this:

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-INDEPENDENT-SEGMENTS
#EXT-X-STREAM-INF:BANDWIDTH=2752609,AVERAGE-BANDWIDTH=1790764,RESOLUTION=852x480,FRAME-RATE=30.000,CODECS="avc1.64001F,mp4a.40.2",CLOSED-CAPTIONS=NONE
index_1.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=1168640,AVERAGE-BANDWIDTH=800800,RESOLUTION=640x360,FRAME-RATE=30.000,CODECS="avc1.64001E,mp4a.40.2",CLOSED-CAPTIONS=NONE
index_2.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=5448960,AVERAGE-BANDWIDTH=3511200,RESOLUTION=1280x720,FRAME-RATE=30.000,CODECS="avc1.64001F,mp4a.40.2",CLOSED-CAPTIONS=NONE
index_3.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=8968960,AVERAGE-BANDWIDTH=5711200,RESOLUTION=1920x1080,FRAME-RATE=30.000,CODECS="avc1.640028,mp4a.40.2",CLOSED-CAPTIONS=NONE
index_4.m3u8
```

Example URL:

```
https://d2y3mlel7uksux.cloudfront.net/8SCsPFERLvhK.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMjYwNDVfOTM2YTk5NzI3MzU3ODFkYmU0ZWYifQ.<redacted>/event_13f3ef50bc214d97dbdce2c6f240b35768f189c770186f4b470c32d4b2cb96af_b9603409fd62441ec5cbc4c62298b699bf5e54363876255b1c2ae380c5d230f4/index.m3u8
```

```shell
❯ yt-dlp_macos --cookies-from-browser firefox 'https://d2y3mlel7uksux.cloudfront.net/8SCsPFERLvhK.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMjYwNDVfOTM2YTk5NzI3MzU3ODFkYmU0ZWYifQ.<redacted>/event_13f3ef50bc214d97dbdce2c6f240b35768f189c770186f4b470c32d4b2cb96af_b9603409fd62441ec5cbc4c62298b699bf5e54363876255b1c2ae380c5d230f4/index.m3u8'
[generic] Extracting URL: https://d2y3mlel7uksux.cloudfront.net/8SCsPFERLvhK.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ij...0c5d230f4/index.m3u8
[generic] index: Downloading webpage
Extracting cookies from firefox
Extracted 698 cookies from firefox
[generic] index: Downloading m3u8 information
[generic] index: Checking m3u8 live status
[info] index: Downloading 1 format(s): 5711
[hlsnative] Downloading m3u8 manifest
[hlsnative] Total fragments: 2801
[download] Destination: index [index].mp4
[download]   1.9% of ~ 946.10MiB at    1.68MiB/s ETA 09:29 (frag 54/2801)
```

```shell
❯ yt-dlp_macos --cookies-from-browser firefox 'https://d2y3mlel7uksux.cloudfront.net/8SCsPFERLvhK.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjIwMjYwNDVfOTM2YTk5NzI3MzU3ODFkYmU0ZWYifQ.<redacted>/event_13f3ef50bc214d97dbdce2c6f240b35768f189c770186f4b470c32d4b2cb96af_b9603409fd62441ec5cbc4c62298b699bf5e54363876255b1c2ae380c5d230f4/index.m3u8'
[generic] Extracting URL: https://d2y3mlel7uksux.cloudfront.net/8SCsPFERLvhK.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ij...0c5d230f4/index.m3u8
[generic] index: Downloading webpage
Extracting cookies from firefox
Extracted 698 cookies from firefox
[generic] index: Downloading m3u8 information
[generic] index: Checking m3u8 live status
[info] index: Downloading 1 format(s): 5711
[hlsnative] Downloading m3u8 manifest
[hlsnative] Total fragments: 2801
[download] Destination: index [index].mp4
[download] 100% of    2.71GiB in 00:16:22 at 2.82MiB/s
[FixupM3u8] Fixing MPEG-TS in MP4 container of "index [index].mp4"
```

In some cases it fails with HTTP 401[^expiry].
Even the stream viewing page also shows popup about unstable network and
same 401 in the network inspector. Abort yt-dlp for now.

```shell
[download] fragment not found; Skipping fragment 2734 ...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (1/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (2/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (3/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (4/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (5/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (6/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (7/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (8/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (9/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2735 (10/10)...
[download] fragment not found; Skipping fragment 2735 ...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2736 (1/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2736 (2/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2736 (3/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2736 (4/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2736 (5/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2736 (6/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2736 (7/10)...
[download] Got error: HTTP Error 401: Unauthorized. Retrying fragment 2736 (8/10)...
^C
ERROR: Interrupted by user
```

Go back to the stream viewer page, and reload the page so it generates new JWT.
Find and copy URL to the same file so yt-dlp can resume the previous download
instead of restarting.
e.g. if using `index.m3u8` before, find URL, same suffix, different JWT.

[^expiry]: The JWT expiry seems to be 2.5 hours. No idea why 401 happens before that.

## Sheeta-based websites

> Last tried 2026-05-27: works. yt-dlp version stable@2026.03.17 (from fork)

> [Sheeta](https://sheeta-info.com/) is a fan club system developed by [DWANGO Co., Ltd.](https://dwango.co.jp/) (株式会社ドワンゴ).
>
> You can find websites supported by this extractor by Googling "[`"(C) DWANGO Co., Ltd." "入会"`](https://www.google.com/search?q=%22%28C%29+DWANGO+Co.%2C+Ltd.%22+%22%E5%85%A5%E4%BC%9A%22)".
>
> — [PR #9978](https://github.com/yt-dlp/yt-dlp/pull/9978)

Example Sheeta-based websites:
- https://nicochannel.jp
- https://qlover.jp

The extractor exists as [unmerged PR #9978](https://github.com/yt-dlp/yt-dlp/pull/9978).
The PR replaces the old `niconicochannelplus` extractor with a broader
`sheeta` extractor. It also patches the generic extractor to tolerate
HTTP 404 responses from SPA sites. Sheeta pages return 404 because
content is rendered client-side. Without the patch, yt-dlp bails
before the Sheeta extractor runs. A plugin cannot fix this, so a fork
is needed.

The fork contains:
- the unmerged PR changes,
- a [header fix](https://github.com/yt-dlp/yt-dlp/pull/9978#discussion_r2194387468) suggested in the PR,
- merged with latest upstream.

```shell
git clone --branch ie/generic/sheeta git@github.com:darcien/yt-dlp.git yt-dlp-sheeta
cd yt-dlp-sheeta
# add args as needed like -v or --cookies
uv run --extra default yt-dlp '<URL>'
# or follow yt-dlp README.md for running from source
```

`--extra default` installs `pycryptodomex`, required for AES-128 HLS
decryption. Without it, yt-dlp falls back to ffmpeg which fails[^sheeta-ffmpeg].

[^sheeta-ffmpeg]: Sheeta's CDN (`hls-auth.cloud.stream.co.jp`) returns HTTP 404 when the request contains a `Range: bytes=0-` header, which ffmpeg sends by default on all HTTP requests.


<details style="margin-block-start: 1em;">
<summary>Sheeta rant</summary>

Initially, I hesitated on forking the PR to make it runnable.
Especially after seeing [Sheeta "owner" commented](https://github.com/yt-dlp/yt-dlp/issues/9541#issuecomment-2686575088)
on the original yt-dlp issue.

But that is no longer the case, I can't hold it in anymore arghhhh.

Sheeta-based websites are already better than the old niconico in terms of
video quality and player.

I want to watch something on nicochannel.jp, logging in with niconico[^not-using-email].
Then on niconico, I have to log in again.
It asks for 2FA from email,
along with the trust this device checkbox that never worked for the past 10 years.

After the 2FA, it usually redirects back to nicochannel.jp.
But, somewhere in January 2026, it breaks on Firefox.

> Oops!, something went wrong
>
> invalid_request: You may have pressed the back button, refreshed during login, opened too many login dialogs, or there is some issue with cookies, since we couldn't find your session. Try logging in again from the application and if the problem persists please contact the administrator. 

I hate the fact that I recognized the error page layout, it's the template from Auth0.

Cool, maybe some privacy setting suddenly blocks the session cookie, or probably misconfigured cookie attributes.
Because the auth redirect works on Safari and Vivaldi.

And yes, I had to do the 2FA trust device thing again.
Not just that, sometimes it stays signed out, so I had to repeat the login, AGAIN.

That's fine, I can live with the workaround, I am calm.

Until I was watching something on qlover.jp.
Then it decides to log me out midway.
Okay? I tried to relogin, but after relogin, auth.qlover.jp doesn't respond
and I am stuck.

Time to sleep, but that's it.
Tomorrow I will make sure I can watch even when I am offline.

Here we are with these notes, thank you pzhlkj6612 for the original work and
garret1317 for the header fix, otherwise I would have started from scratch.

While I am here, I also want to rant about other things.

Like why the actual fuck does qlover need my full personal information
including date of birth, phone number, and address. NO, I just want to watch
something, you don't need all that.
Still can't beat the worst offender though, the SMA fanclub website, but that's a separate rant.

Also, all Sheeta websites disable picture-in-picture (PiP) on the video player.
Why would you, a website dedicated to playing video, go out of your way to disable it[^enable-pip].
I can't think of any good reasons other than greed to sell background playback.

All of my decisions are made based on the fact that I am a paying user.
I have multiple active paying subscriptions.
I assume part of the money goes to the creator, not everything goes to Sheeta.

But it's simply unacceptable to me.
Not only the service did not improve over time, it got worse!
I am not even doing this to redistribute the videos.
I just want to watch something I am entitled to without disruption from
broken auth or shitty SPA.

</details>

[^not-using-email]: I regret not using email-password to login.
Remember kids, don't log in with 3rd party unless you really really need something that only works via 3rd party login.
You will eventually get screwed by that 3rd party and then lose your access for no good reason.

[^enable-pip]: I want PiP enough to the point I wrote [userscript](https://github.com/darcien/userscripts/tree/master/disable-disablepictureinpicture) to enable it.

## Changelog

- 2026-05-27: add sheeta
- 2026-04-18: initial version
