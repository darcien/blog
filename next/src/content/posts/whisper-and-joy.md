---
title: "Whisper and Joy"
date: 2025-07-15T21:04:00+10:00
tags: ["gkms", "100DaysToOffload"]
summary: "I should write more about the makings of my dumb side project before it gets shelved and never written about again."
---

> 🔖 Assumed post audience: me.
> This is not a tutorial for whisper.cpp.
> I am writing up my usage, and if I don't write it now, I'll never write about it.


I want to analyze the words used in an internet radio series.
It's for a [dumb side project][gkms].

[gkms]: https://github.com/darcien/gkms

I already heard about [Whisper from OpenAI][whisper] before.
And I finally have the justification to try it out.

[whisper]: https://openai.com/index/whisper/

## Attempt 1 - insanely fast whisper

I don't remember why, but I started with [insanely fast whisper][] instead of the official Whisper repo.
Probably drawn in by the name, who doesn't like insanely fast stuff.

[insanely fast whisper]: https://github.com/Vaibhavs10/insanely-fast-whisper

Attempt didn't last long though.
I followed the readme and used `pipx`.
And it failed on building `sentencepiece` with no clear error message.

I tried again with `uv tool install`.
It failed again on `sentencepiece`, but gave a better message around the
minimum CMake version.
Unfortunately, I already have latest CMake via Homebrew.

A quick search turned up various people, each with different setups
and different errors.

Great.

It's 2025 and Python ecosystem is still as messy as ever.
I didn't miss it at all.


## Attempt 2 - MacWhisper

I found MacWhisper in a [GH discussion][macwhisper].
Looks like a clean and simple macOS app with no python mess, let's try it.

[macwhisper]: https://github.com/ggml-org/whisper.cpp/discussions/420

It's free, and I'm grateful for that.
But oof, on start, it downloads the v3 turbo model.
It immediately runs transcription on my CPU on file selection.
And then say it says it's requires pro license.

100 EUR for permanent license.

Ok, time to try something else.
Sorry, not a fan of that default behavior of wasting bandwidth and CPU before asking for money.
I lost my interest even before retrying with "free" model.


## Attempt 3 - whisper.cpp

I'm going to start with: no dependencies is awesome.
That's [whisper.cpp][].

[whisper.cpp]: https://github.com/ggml-org/whisper.cpp

I cheated a bit and installed via Homebrew though.
```shell
brew install whisper-cpp
```

Next, model.
My radio series is in Japanese.
I can't find any mainstream JP model.
So I went with `large-v3-turbo`.

There are quantized models (q5 and q8 at the time).
But doesn't seem to provide any savings in my case.
I have enough RAM to load the large model (~3.9 GB) and the disk savings are < 1 GB.

whisper.cpp provided [nice script] to download the model:

```shell
./download-ggml-model.sh large-v3-turbo
```

[nice script]: https://github.com/ggml-org/whisper.cpp/blob/master/models/README.md

Next, preparing the audio input.

## Preparing the audio

> Note that the whisper-cli example currently runs only with 16-bit WAV files, so make sure to convert your input before running the tool. For example, you can use ffmpeg like this:
> ```shell
> ffmpeg -i input.mp3 -ar 16000 -ac 1 -c:a pcm_s16le output.wav
> ```

Okay, my source is an mp4 container.
How can I convert it to WAV?

That was a dumb question.
`ffmpeg` is just too awesome, you can throw the mp4 at it directly.

So my command is exactly the same as the example from whisper.cpp.

## Test run with whisper.cpp

Ooohhhh it runs on metal, literally!

```
❯ whisper-cli -m ./ggml-large-v3-turbo.bin --detect-language -f housoubu/45_f5t3gjlf9we.wav
whisper_init_from_file_with_params_no_state: loading model from './ggml-large-v3-turbo.bin'

...

system_info: n_threads = 4 / 10 | WHISPER : COREML = 0 | OPENVINO = 0 | Metal : EMBED_LIBRARY = 1 | CPU : NEON = 1 | ARM_FMA = 1 | FP16_VA = 1 | DOTPROD = 1 | ACCELERATE = 1 | REPACK = 1 |

main: processing 'housoubu/45_f5t3gjlf9we.wav' (44800341 samples, 2800.0 sec), 4 threads, 1 processors, 5 beams + best of 5, lang = auto, task = transcribe, timestamps = 1 ...

whisper_full_with_state: auto-detected language: ja (p = 0.998406)

...

ggml_metal_free: deallocating
```

I'm using `--detect-language` just for sanity check, but it's looking great!
```shell
-dl, --detect-language [false] exit after automatically detecting language
```

Onwards to the real test run!
I tested with default parameters, and the live output looks great.

Until I saw this:
```text
[00:33:06.200 --> 00:33:08.520]  シン・スミカでラブ&ジョイ
[00:33:08.920 --> 00:33:30.900]  さよならを告げた後悔
[00:33:30.900 --> 00:33:32.900]  さよならを告げてください
[00:33:32.900 --> 00:33:33.900]  さよならを告げてください
[00:33:33.900 --> 00:33:34.900]  さよならを告げてください
...
[00:36:25.900 --> 00:36:27.900]  さよならを告げてください
[00:36:27.900 --> 00:36:29.900]  さよならを告げてください
[00:36:29.900 --> 00:36:30.900]  さよならを告げてください
[00:36:30.900 --> 00:36:33.900]  7月4日の公演をもって完走した
```

Looks very scary at first, like one of those horror movies where paranormal
activities start to spam you with the same message over and over.
Even more so when model changed the lyric from "さよならを告げた 後悔"
to "さよならを告げてください".
Literally translated, it's "I said goodbye. Regret" changed to "Please say goodbye".

So what I have now is:
```text
Please say goodbye
Please say goodbye
Please say goodbye
...
Please say goodbye
Please say goodbye
Please say goodbye
```

😱😱😱

But I already listened to that episode.
I know nobody is repeating that same sentence for 3 minutes straight.

Actual lyrics are[^love-and-joy]:
```text
さよならを告げた 後悔
一歩ずつ前へ進んでも
まだ隠してる弱さは見せれない
```

The model did get the first sentence correct.
But the song already stopped playing at 34:50 mark.
Another sentence already started from 34:55 and it still outputs the same goodbye sentence.
So model lost track of at least ~1.5 minutes worth of conversation here.

This audio section might be a good test input while I do trial and error
with the transcription.
It shouldn't be censorship that prevents transcribing licensed music right?
I sure hope we're not at that point of dystopia yet.

## What's next?

I need to optimize whisper parameters to fit my use case.
Probably manually for now since the radio episode isn't that long, ~46 mins each.

Also need to download only the audio part as the radio video is mostly static and irrelevant in this case.
Probably `yt-dlp -x` works here.

## Afterthought

I'm not sure what is this weird feeling.
The "standing on the shoulder of giants" feeling, maybe awe?
It's mindblowing that I could just piece around few open source building blocks
in a few hours, and have a working implementation for video -> audio -> text.
And it's for non-English content!

Few years ago, I feel like this would take me maybe months to read
and implement someone's PhD thesis.
I wouldn't have the time to do that for a dumb side project!

Once again I feel grateful for Georgi Gerganov for making whisper.cpp happen,
legends that maintains yt-dlp and ffmpeg,
and all other open source project maintainers.

Also, playing around with speech recognition was a nice change of pace from
the LLM slop I deal with on daily basis.

---

Post 26 of [#100DaysToOffload](https://100daystooffload.com/).


[^love-and-joy]: The song was ["Love & Joy" by 紫雲清夏 (CV. 湊 みや)](https://www.youtube.com/watch?v=YzBr_c61TsU).
Honestly it's just so good that I don't enough vocabulary to describe it.
