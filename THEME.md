# Soundbot Mgmts — Theme & Color Palette Reference

> Internal reference for frontend developers. All tokens are Tailwind utility classes unless marked as CSS custom property.

---

## Core Philosophy

The UI runs on a **stone-based neutral foundation** with **purple as the primary brand accent** and **contextual semantic colors** for entity types (players, devices, sessions, charging). Dark mode is the default experience — the app feels like a late-night listening session, not a productivity tool.

---

## Surface & Background Scale

| Role                   | Light                        | Dark                   | Usage                               |
| ---------------------- | ---------------------------- | ---------------------- | ----------------------------------- |
| **Page BG**            | `bg-white` or `bg-stone-100` | `bg-stone-900`         | Root page background                |
| **Card / Panel BG**    | `bg-stone-200`               | `bg-stone-800`         | Cards, panels, player/device tiles  |
| **Elevated / Toolbar** | `bg-stone-300`               | `bg-stone-700`         | Chart header bar, modals, dropdowns |
| **Subtle Input BG**    | `bg-stone-100`               | `bg-stone-900`         | Input fields, secondary surfaces    |
| **Border / Divider**   | `border-stone-200`           | `border-purple-400/20` | Default card/panel borders          |

> **Rule:** Borders in dark mode are `purple-400` at 20% opacity — giving a very subtle violet edge that reinforces brand without being loud.

---

## Brand / Primary Color

| Token           | Value               | Usage                                              |
| --------------- | ------------------- | -------------------------------------------------- |
| `purple-300`    | `#d8b4fe`           | Dark mode body text on purple surfaces             |
| `purple-400`    | `#c084fc`           | Primary brand accent, active state borders         |
| `purple-400/20` | `rgba(c084fc, 0.2)` | Card borders in dark mode                          |
| `violet-400`    | `#a78bfa`           | Player nickname labels, device labels              |
| `indigo-400`    | `#818cf8`           | Device icons, section headings (Streaming Players) |
| `indigo-700`    | `#4338ca`           | Section heading text in light mode                 |

---

## Semantic / Entity Colors

Each entity type in the app has a dedicated color. Consistent across cards, borders, buttons, and labels.

| Entity         | Color   | Tailwind Class                              | Usage                        |
| -------------- | ------- | ------------------------------------------- | ---------------------------- |
| **Player**     | Emerald | `border-emerald-400`, `outline-emerald-400` | Player tile border + outline |
| **Device**     | Violet  | `border-violet-400`, `outline-violet-400`   | Device tile border + outline |
| **Session**    | Emerald | `bg-emerald-400`                            | Create Session CTA button    |
| **Charging**   | Rose    | `bg-rose-400`                               | Create Charging CTA button   |
| **Player CTA** | Sky     | `bg-sky-400`                                | Create Player CTA button     |
| **Device CTA** | Indigo  | `bg-indigo-400`                             | Create Device CTA button     |

> **Pattern:** Entity borders use `border-{color}-400 outline-{color}-400 hover:outline-2` for an interactive glow-like hover effect without actual CSS glow.

---

## Text Color Scale

| Role                       | Light             | Dark               | Tailwind                          |
| -------------------------- | ----------------- | ------------------ | --------------------------------- |
| **Primary body**           | `text-slate-800`  | `text-slate-200`   | Page text, section headings       |
| **Secondary body**         | `text-slate-700`  | `text-slate-300`   | Supporting text, descriptions     |
| **Muted / tertiary**       | `text-slate-500`  | `text-slate-400`   | Timestamps, metadata              |
| **Summary stat title**     | `text-cyan-600`   | `text-cyan-600`    | Stat card label (same both modes) |
| **Summary stat value**     | `text-sky-600`    | `text-purple-300`  | Stat card number                  |
| **Player / Device name**   | —                 | `text-violet-400`  | Entity nickname labels            |
| **Player section heading** | `text-indigo-700` | `text-indigo-700`  | "Streaming Players" label         |
| **Device section heading** | —                 | `text-teal-400`    | "Usage Devices" label             |
| **Chart section heading**  | —                 | `text-emerald-400` | "Analytical Charts" label         |
| **Quick Actions heading**  | `text-slate-800`  | `text-slate-200`   | Uppercase section label           |
| **CTA button text**        | `text-slate-200`  | `text-slate-200`   | All action buttons                |

---

## Summary / Stat Cards

The summary strip at top of dashboard is the most brand-defining UI pattern. Extract these exact tokens.

```
border border-slate-200 dark:border-purple-400/20
rounded-md
bg-white dark:bg-stone-800 (implied from card pattern)
px-4 py-2
w-60
```

| Element             | Token                                                              |
| ------------------- | ------------------------------------------------------------------ |
| Card border (light) | `border-slate-200`                                                 |
| Card border (dark)  | `border-purple-400/20`                                             |
| Stat title          | `text-cyan-600 text-sm`                                            |
| Stat value          | `text-sky-600 dark:text-purple-300 font-bold font-poppins text-md` |

---

## Typography

| Role                                     | Font                                         | Tailwind                        |
| ---------------------------------------- | -------------------------------------------- | ------------------------------- |
| **Primary UI font**                      | System / Tailwind default                    | Default                         |
| **Stat values, headings, brand moments** | Poppins                                      | `font-poppins`                  |
| **Scale**                                | sm (labels), md (values), xl (chart heading) | `text-sm`, `text-md`, `text-xl` |

> **Poppins** is the brand typeface — used for all numbers, entity names, and the Recap personality card. Never use it for body copy.

---

## Interactive States

| State                         | Pattern                                                                             |
| ----------------------------- | ----------------------------------------------------------------------------------- |
| **Hover — player tile**       | `hover:outline-2` (outline thickens from 1 to 2)                                    |
| **Hover — device tile**       | Same as player                                                                      |
| **View toggle — list active** | `bg-sky-300`                                                                        |
| **View toggle — grid active** | `bg-emerald-300`                                                                    |
| **View toggle — inactive**    | `bg-stone-400 dark:bg-stone-600`                                                    |
| **Quick action links**        | `text-slate-700 dark:text-slate-300 hover:text-slate-800 hover:dark:text-slate-200` |
| **Navigation arrow icon**     | `text-slate-800 dark:text-slate-200` (GoArrowUpRight)                               |

---

## Recap Page — Specific Palette

The Recap page breaks from the standard stone surface and enters a **cinematic dark mode** — even in light mode it should feel like a theater.

| Element                     | Token                                             | Notes                                 |
| --------------------------- | ------------------------------------------------- | ------------------------------------- |
| **Page BG**                 | `bg-stone-900` or `bg-black`                      | Force dark regardless of system theme |
| **Card BG**                 | `bg-stone-800`                                    | Stat cards                            |
| **Card border**             | `border-purple-400/20`                            | Consistent with app dark borders      |
| **Hero number (headline)**  | `text-white font-poppins font-bold`               | Big stat text                         |
| **Subtext (text field)**    | `text-slate-300 text-sm`                          | Below headline                        |
| **Personality card BG**     | `bg-stone-900` or near-black                      | Closing card                          |
| **Personality name**        | `text-purple-300 font-poppins font-bold text-3xl` | The "screenshot moment"               |
| **Personality subheading**  | `text-slate-200 text-lg`                          | Headline field                        |
| **Personality text**        | `text-slate-400 text-sm`                          | Text field                            |
| **Category label (Yearly)** | `text-cyan-400 font-bold uppercase text-xs`       | Section divider card                  |
| **Progress ring color**     | `stroke-purple-400`                               | Active Days ring                      |
| **Arrow up**                | `text-emerald-400`                                | ↑ vs Last Month                       |
| **Arrow down**              | `text-rose-400`                                   | ↓ vs Last Month                       |
| **Arrow flat**              | `text-slate-400`                                  | = vs Last Month                       |

---

## Color Quick Reference Card

```
NEUTRALS (surfaces)
stone-700  ← toolbar/header bg
stone-800  ← card bg (dark)
stone-900  ← page bg (dark) / recap forced bg

BRAND
purple-300   ← stat values (dark)
purple-400   ← borders, accents
purple-400/20 ← card borders (dark)
violet-400   ← entity labels

ENTITIES
emerald-400  ← players, sessions
violet-400   ← devices
rose-400     ← charging
sky-400      ← player CTA
indigo-400   ← device CTA, icons
teal-400     ← device section

TEXT
slate-200  ← primary dark
slate-300  ← secondary dark
slate-400  ← muted dark
cyan-600   ← stat labels
sky-600    ← stat values (light)

FEEDBACK
emerald-400  ← up / positive
rose-400     ← down / negative
slate-400    ← neutral / flat
```

---

## What NOT to Do

- Don't use raw `gray-*` — the app is `stone-*` based. They look similar but stone has a warmer undertone that matches the audio/music mood.
- Don't use `purple-400` as text color on light backgrounds — it won't meet contrast. Use `indigo-700` or `violet-700` for light mode text.
- Don't add CSS `glow` or `box-shadow` effects — the outline hover pattern is deliberate, glows are not part of this system.
- Don't use Poppins for body copy — only numbers, names, and brand moments.
- Don't use any color not in this doc for new entity types — extend the semantic color table first, agree on it, then implement.
