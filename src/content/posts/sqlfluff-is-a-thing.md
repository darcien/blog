---
title: "SQLFluff Is a Thing"
date: 2022-12-08T22:09:26+07:00
tags: ["til", "100DaysToOffload"]
summary: "A fluff that I wish I had known earlier."
---

> The SQL Linter for Humans
>
> Bored of not having a good SQL linter that works with whichever dialect you’re working with? Fluff is an extensible and modular linter designed to help you write good SQL and catch errors and bad SQL before it hits your database.
>
> From https://www.sqlfluff.com

Earlier today at work, I was helping my coworker debugging his SQL.
The SQL was fairly simple.
It creates a few tables, create some foreign keys, and insert some data.

But when we execute the SQL, it is failing.
Part of the SQL looks like this:

```sql
INSERT INTO "public"."some_table" ("category", "description")
    VALUES ("drama", "tears and blood");
```

And the DB spits out this error:

```
SQL Error [42703]: ERROR: column "drama" does not exist
```

A battle-hardened SQL veteran would probably notice the issue immediately.
But it's not very clear to regular human like me.

If you guessed the problem is the quotes, then you're correct.
String value must use single quotes as the double quotes is reserved for objects in PostgreSQL, like table and column names[^pgql].

I found it out after a bit of trial and error, a bit of headbanging, and no googling attempt.
Which leads to me trying to find the tool to help writing an actually valid SQL, not one that looks kinda valid but not really.
And that's how I found this fluff, which give somewhat better error message:

```
L057 	2 / 22

Do not use special characters in identifiers.
```

Hey, at least it's not complaining about "no drama".
And the mentioning the cause is a special characters already helped pinpoint the issue.

So, I am today years old when I learned:

- use single quotes for string, and double quotes for identifier,
- [SQLFluff](https://www.sqlfluff.com/) is a thing.

[^pgql]: https://www.postgresql.org/docs/current/sql-syntax-lexical.html

---

Post 4 of [#100DaysToOffload](https://100daystooffload.com/).
