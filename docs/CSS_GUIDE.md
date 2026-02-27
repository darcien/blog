# CSS Guide

## Spacing: gap vs margin

Use `gap` for component containers where children are controlled (nav, header, card layouts).
Use `margin-block-start` for prose/flow content where different elements need different spacing.

### When to use gap

```css
/* Component containers with uniform spacing */
.site-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Lists with equal item spacing */
.toc ul {
  display: flex;
  flex-direction: column;
  gap: 0.25em;
}
```

### When to keep margin

```css
/* Prose flow — different elements need different spacing */
p {
  margin-block-start: 1em;
}
h2 {
  margin-block-start: 1.5em;
}
figure {
  margin-block-start: 1.5em;
}
```

### Section separators

Use a CSS variable for consistent spacing around separators (borders, `* * *`, `hr`):

```css
:root {
  --section-gap: 2rem;
}

/* body gap handles spacing between top-level sections */
body {
  gap: var(--section-gap);
}

/* bordered sections use the same variable for padding around the border */
.site-footer {
  border-top: 1px solid var(--border);
  padding-block-start: var(--section-gap);
}
```

## Nesting

CSS nesting is parsed by the browser, not pre-compiled like Sass.
The `&` nesting selector specificity is similar to the `:is()` function.

### Child selectors

```css
/* without nesting selector */
.parent {
  /* parent styles */
  .child {
    /* child of parent styles */
  }
}

/* with nesting selector */
.parent {
  /* parent styles */
  & .child {
    /* child of parent styles */
  }
}

/* the browser will parse both of these as */
.parent {
  /* parent styles */
}
.parent .child {
  /* child of parent styles */
}
```

### Combinators

```css
h2 {
  color: tomato;
  + p {
    color: white;
    background-color: black;
  }
}

/* this code can also be written with the & nesting selector */
h2 {
  color: tomato;
  & + p {
    color: white;
    background-color: black;
  }
}
```

### Compound selectors

```css
.a {
  /* styles for element with class="a" */
  .b {
    /* styles for element with class="b" which is a descendant of class="a" */
  }
  &.b {
    /* styles for element with class="a b" */
  }
}

/* the browser parses this as */
.a {
  /* styles for element with class="a" */
}
.a .b {
  /* styles for element with class="b" which is a descendant of class="a" */
}
.a.b {
  /* styles for element with class="a b" */
}
```

Practical example:

```css
.notice {
  width: 90%;
  justify-content: center;
  border-radius: 1rem;
  border: black solid 2px;
  background-color: #ffc107;
  color: black;
  padding: 1rem;
  .notice-heading::before {
    /* equivalent to `.notice .notice-heading::before` */
    content: "ℹ︎ ";
  }
  &.warning {
    /* equivalent to `.notice.warning` */
    background-color: #d81b60;
    border-color: #d81b60;
    color: white;
    .warning-heading::before {
      /* equivalent to `.notice.warning .warning-heading::before` */
      content: "! ";
    }
  }
  &.success {
    /* equivalent to `.notice.success` */
    background-color: #004d40;
    border-color: #004d40;
    color: white;
    .success-heading::before {
      /* equivalent to `.notice.success .success-heading::before` */
      content: "✓ ";
    }
  }
}
```

### Appended nesting selector

```css
.card {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  & h2 {
    /* equivalent to `.card h2` */
    color: slateblue;
    .featured & {
      /* equivalent to `:is(.card h2):is(.featured h2)` */
      color: tomato;
    }
  }
}
```

### Nested declarations rule

```css
.foo {
  background-color: silver;
  @media screen {
    color: tomato;
  }
  color: black;
}
```

### Concatenation (not possible)

```css
.component {
  &__child-element {
  }
}
/* In Sass this becomes .component__child-element */
/* In CSS nesting this does NOT work */
```

When a combinator is not used, the nested selector is treated as a type selector.
In compound selectors, the type selector must come first:

```css
.my-class {
  element& {
  }
}

/* the browser parses this to become a compound selector */
.my-class {
}
element.my-class {
}
```

### Invalid nested style rules

```css
.parent {
  /* .parent styles these work fine */
  & %invalid {
    /* %invalid styles all of which are ignored */
  }
  & .valid {
    /* .parent .valid styles these work fine */
  }
}
```
