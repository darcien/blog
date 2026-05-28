---
title: "Rationalizing Irrationality"
date: 2026-05-28T11:52:36Z
tags: ["musing", "100DaysToOffload"]
---

It's been over 1 year since I moved to work in another country.
I thought it would flip my life upside down.

There are major changes, but it turns out it wasn't that extreme.
Still the same worries,
what do I eat tonight,
do I have enough money to pay the bills,
where am I going in life next?

I don't really have social media,
so eventually I should post something,
probably mundane photos in this blog.

How does that relate to this post?
It's because the biggest change in the past few years is "AI".
Everything is AI AI AI.

And where does the training data come from?
By slurping the internet. Cool.
When I am setting up a new subdomain,
a stupid amount of crawlers immediately crawl it.
Then I stood up a simple website to search a static SQLite DB.
Not even a day has passed since then,
server logs show that every SINGLE search result page is crawled,
all the way to page 999.

```log
74.7.227.189 - - [19/Feb/2026:19:37:29 +0800] "GET /?nsfw=1&page=997&type=Manga HTTP/2.0" 302 0 "https://findmu.darcien.me/?page=997&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
74.7.227.189 - - [19/Feb/2026:19:37:29 +0800] "GET /?page=997&type=Manga HTTP/2.0" 200 4709 "https://findmu.darcien.me/?nsfw=1&page=997&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
74.7.227.189 - - [19/Feb/2026:19:37:30 +0800] "GET /?nsfw=0&page=998&type=Manga HTTP/2.0" 302 0 "https://findmu.darcien.me/?nsfw=1&page=998&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
74.7.227.189 - - [19/Feb/2026:19:37:30 +0800] "GET /?page=998&type=Manga HTTP/2.0" 200 5001 "https://findmu.darcien.me/?nsfw=0&page=998&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
74.7.227.189 - - [19/Feb/2026:19:37:31 +0800] "GET /?nsfw=0&page=999&type=Manga HTTP/2.0" 302 0 "https://findmu.darcien.me/?page=999&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
74.7.227.189 - - [19/Feb/2026:19:37:31 +0800] "GET /?page=999&type=Manga HTTP/2.0" 200 4953 "https://findmu.darcien.me/?nsfw=0&page=999&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
74.7.227.189 - - [19/Feb/2026:19:37:31 +0800] "GET /?nsfw=0&page=997&type=Manga HTTP/2.0" 302 0 "https://findmu.darcien.me/?nsfw=1&page=997&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
74.7.227.189 - - [19/Feb/2026:19:37:32 +0800] "GET /?page=997&type=Manga HTTP/2.0" 200 4774 "https://findmu.darcien.me/?nsfw=0&page=997&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
74.7.227.189 - - [19/Feb/2026:19:37:32 +0800] "GET /?nsfw=1&page=999&type=Manga HTTP/2.0" 302 0 "https://findmu.darcien.me/?nsfw=0&page=999&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
74.7.227.189 - - [19/Feb/2026:19:37:33 +0800] "GET /?page=999&type=Manga HTTP/2.0" 200 4807 "https://findmu.darcien.me/?nsfw=1&page=999&type=Manga" "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.3; +https://openai.com/gptbot)" "-"
```

```shell
$ sudo awk '{split($1,a,"."); c[a[1]"."a[2]"."a[3]]++} END {for (k in c) print c[k], k".0/24"}' /var/log/angie/access.log | sort -rn | head -10
140457 74.7.227.0/24
41916 85.203.23.0/24
31774 127.0.0.0/24
16944 185.177.72.0/24
10684 34.155.176.0/24
10220 193.37.32.0/24
9989 45.148.10.0/24
9813 93.123.109.0/24
7348 195.178.110.0/24
5274 139.162.8.0/24
```

What the actual \*\*\*\*.

Haha, I can only laugh.
This timeline is a joke.

For starters, I stood up [Anubis][][^why-anubis],
but my personal vendetta against AI crawlers is a story for a different post.

[Anubis]: https://anubis.techaro.lol

[^why-anubis]:
    Yes, it's the anime girl loading page.
    Yes, it's the JS-based proof-of-work challenge.
    No, I don't want to use Cloudflare.
    Yes, I don't mind if some real human gets blocked.
    The ship has sailed.
    I just want to put something on my website without being DDoS-ed to death.
    Making sure as many humans as possible can read it is not part of it.

That was my peak point of sadness.
I'm not angry.
I'm just sad.

I used to think having a little corner of a personal website on the internet
is kinda nice.
Then it became a chore of keeping the tooling up to date[^was-hugo].
Then what's the point of writing the commonly seen posts like migrating from x to y?
From there, why would I want to write unique information if it will just end up
being AI training data?

[^was-hugo]:
    Was using hugo, which is not exactly known for its backward
    If it works for you, great. It's open source, you're free to build from source
    and keep running an old version. But it's not for me.

Now that I've written it down, it feels like I was walking towards nihilism.
I don't like it.

what if I just start writing again?
Write whatever, swallow my pride of keeping the writing good enough.
Stop with the eternally unpublished drafts.

I mentioned these thoughts to my friend the other day.
"Just publish it."
Even if it's a simple workaround.
Even if it has been reposted a bajillion times.
I am still the [lucky ten thousand][] for that moment.

[lucky ten thousand]: https://xkcd.com/1053/

Is there any point in writing down my own thoughts on the public internet?
In this age of [dark forest][]?
Maybe there is.
Maybe it doesn't matter, I am doing it anyway.
This is my website.
I can write whatever I want here.
Be free, and keep moving forward.

[dark forest]: https://ryelang.org/blog/posts/cognitive-dark-forest/
