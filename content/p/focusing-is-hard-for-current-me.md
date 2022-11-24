+++
title = "Focusing Is Hard For Current Me"
date = "2022-11-25T01:30:43+07:00"
author = "Yosua"
authorTwitter = "darcien_" #do not include @
cover = ""
tags = ["random", "100DaysToOffload"]
keywords = []
showFullContent = false
draft = false
+++

It's almost 2am now. What? It's already this late!?

I started touching the codebase for this blog at 8pm.
Why would it take 6 hours just to write some texts?

Okay, tracking back my steps.
This is my Windows machine, it's been forever since I used it to write anything including codes.
Usually it's just a glorified media player or video editing workhorse.
Oh all the distractions in this entertainment device...

And I'm typing on a "new" keyboard, my first split keyboard.
It doesn't even have arrow keys.
It has trackball and trackpoint on it though.
Turns out not having a dedicated arrow keys is a major productity killer for me right now.
Most common text manipulation shortcut I use needs arrow keys.
And adding one extra mod key to press doesn't help.
It puts my hand into a really clunky position.
And you can throw muscle memory out of the window.

The wooden palm rest is nice though.

I also tried setting up Sapling, a git compatible SCM.
Super interesting for me as I like the stacked PR approach.
Maybe if I use it here, it will give me some good productivity and mood boost!
1 hour trying, and... nope. I will stick with plain old git.
It is compatible with git, but you can't use existing local git repo and start using sl (Sapling binary, equivalent to git) right away.
You need to clone the remote again using `sl clone` as it use `.sl` instead of `.git`.
The fact that sl errors with `abort: '<path>' is not inside a repository, but this command requires a repository!` does not help all.
(Google only return 1 hit for that error and it's the source repo :), thankfully someone posted an issue upstream and has provided solution there, so thanks for that.)

It's not only that, I also had a bunch of problem with sub modules and default-push behavior not working correctly.
The web manual and help output from the binary also doesn't match.
Undocumented commands here and there.
Sapling is cool, probably it works great in Meta, but for me and my solo micro sized project, nah.

After that, I also had to deal with a bunch of Windows env things.
I'm pretty sure I already have hugo binary installed and ready to use.
Why would I get unknown command when running it?
Maybe I fucked up some time ago, maybe a Windows update, maybe a rogue install script, who knows?
Here we go, spelunking into Windows system env just to run a binary without specifying the full path every single time.

Okay, Windows env all fixed up, good path, binary is in the path, all good.
Or not, still not found in built-in command prompt in VSCode.
Yes I opened a new prompt, not working.
Closed all open prompt, reopen, still not working.
I'm tired, a full restart will definitely fix this and that's what I do.

The turn off and then on again trick sure works!
(Later on I realized restarting just VSCode also works)

Now we have everything, I would start writing right?
Turns out no, I just had to try and clean things up.
Documents things here and there, setup `justfile` (Makefile alternative for running commands, not building) and all the mumbo jumbo since this is my first time using it.

Finally, here we are nearing the end of the post.
It's not even 1 hour to write all this messy ramblings.

It's past 2am now and I realized it's really hard for me to focus right now, I would make excuses to avoid doing things to myself.
I just want to write right now.
I don't care whether people read this or not.
Cleaning and documenting things here are nice, not much point if only I used it though.
Next time, I should focus more on the goal and resist the distractions.

---

I already had the plan for updating this blog this month, but the final push is seeing this [post](https://garrit.xyz/posts/2022-11-24-smart-move-google) in HN and saw the 100 posts challenge.

Post 1 of [#100DaysToOffload](https://100daystooffload.com/).
