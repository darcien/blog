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

## Changelog

- 2026-04-18: initial version
