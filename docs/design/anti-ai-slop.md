# Anti-AI-Slop Rules — TEAM RAW

> Binding project rules for visual quality. Apply to every screen before shipping.
> Companion to `design-system.md`.

---

## Why this file exists

Generative defaults produce a recognizable, homogenous look: purple-blue gradient heroes, glassmorphism everywhere, six identical rounded cards, neon glow, meaningless stats. That aesthetic reads as *unconsidered* — and it would actively damage a robotics team that needs to look technically credible.

**The test:** if a page could belong to any random SaaS startup, it is wrong for TEAM RAW.

---

## Part A — WHAT TO AVOID

### A1. Layout defaults
| Avoid | Why |
|---|---|
| Generic gradient hero (purple/blue mesh) | The single most recognizable AI tell |
| Hero → 3 equal cards → CTA → footer | Template skeleton, no information design |
| Six identical cards repeated per section | Says nothing about hierarchy |
| Giant headline with no supporting hierarchy | Scale ≠ design |
| Meaningless statistics ("10k+ users") | Fabricated credibility |
| Excessive badges/pills/tags | Noise, not information |
| Huge whitespace used only to look "premium" | Emptiness isn't elegance |
| Pill-shaped everything, giant rounded cards | Soft-default look |
| Random floating 3D objects / glowing borders | Decoration without meaning |

### A2. Color defaults
| Avoid | Why |
|---|---|
| Neon blue / cyan overload | Not our brand |
| Glowing text and glowing borders everywhere | Undifferentiated emphasis |
| Saturated gradients unrelated to the brand | Breaks identity |
| Random mesh gradients | Same |
| **Adopting UI/UX Pro Max's recommended palette verbatim** | It proposes `#2563EB` blue + orange — **that is not TEAM RAW**. We are Navy `#0A1A3A` + Red `#E10600`. Use its *reasoning and checklists*, never its palette. |

### A3. Motion defaults
| Avoid | Why |
|---|---|
| Constant floating / idle bobbing | Distracting, implies instability |
| Parallax everywhere | Costs perf, adds no meaning |
| Infinite animations | Perf + attention drain |
| Cursor-following effects on every surface | We already have one intentional custom cursor — that's the budget |
| Unnecessary page transitions | Slows navigation |
| Random 3D | Arbitrary |
| Excessive spring/bounce | Undermines the "machined precision" identity |
| Animating purely because a library is installed | `lenis` and Framer Motion existing is not a reason |

### A4. Typography defaults
| Avoid | Why |
|---|---|
| Defaulting to Inter/Arial with no consideration | Our identity is **Orbitron** headings + **Montserrat** body |
| One font for everything | We have a heading/body/mono/decorative system — use it |
| Overly stylized text that hurts readability | Never trade legibility for style |

### A5. Component defaults
| Avoid | Why |
|---|---|
| Dropping in unused `src/components/ui/*` because it exists | ~33 of 39 are already dead code — don't add to it |
| Making the site look like a component-library demo | Composition must be project-specific |
| Importing a second component system for the same job | Duplication is the root cause of drift |
| `ui-styling` skill's shadcn/Tailwind output | **Our project has no Tailwind.** That skill's guidance does not apply here. |
| "Revolutionize / transform / unlock / supercharge" copy | Marketing filler |

---

## Part B — WHAT TO PREFER

### B1. Composition
- **Composition built from real content.** Let TEAM RAW's actual robots, competitions, and achievements determine the layout.
- **Information hierarchy by importance** — not by symmetry.
- **Intentional asymmetry** where it creates emphasis; balance where it creates calm.
- Content-driven section shapes. Different sections may legitimately look different.

### B2. Color
- A palette **derived from brand**: Navy foundation, single Red accent.
- Roughly **70% dark/neutral foundation · 20% secondary surface · 10% accent** — the accent creates hierarchy, not noise.
- Red is a **scalpel**. If everything is red, nothing is emphasized.
- Validate contrast in **both** light and dark themes.

### B3. Typography
- **Orbitron** carries the technical/robotics character in headings.
- Establish hierarchy through **size, weight, spacing, and color** — not just scale.
- Mono (JetBrains Mono) for data, badges, tags, stat values — reinforces the engineering voice.
- Consider **measure** (line length), not just size.

### B4. Motion
Every animation must answer: *what does this communicate?*
- **Hierarchy** — what deserves attention first
- **State** — hover, focus, active, loading, error
- **Continuity** — where did this come from / go
- **Feedback** — did my action register
- **Navigation** — where am I
- **Spatial relationships** — how do these things connect

Prefer subtle, short, purposeful transitions. CSS first; Framer Motion when state is genuinely complex.

### B5. Materiality & craft
- Use **real imagery** of actual robots/competitions where possible.
- Custom SVG and technical grid patterns fit the identity — `.grid-pattern`, `.squircle`, robot cursor.
- Haikei-style abstract SVG only when it **supports the direction** — never as filler to occupy empty space.
- Consistency across the whole site beats per-page novelty.

### B6. Engineering quality
- Semantic HTML, accessible by default, responsive at every tier.
- Reuse existing components before creating new ones.
- Reuse tokens before hardcoding values.
- Performance: no oversized images, no unnecessary JS, no expensive filters/blur/3D.

---

## Part C — PRE-FLIGHT CHECK

Before shipping any substantial UI, answer **yes** to all:

1. Is the purpose of this element clear?
2. Does it establish a deliberate information hierarchy?
3. Can I explain *why* it looks this way?
4. Does it match TEAM RAW's identity (Navy/Red/Orbitron/technical)?
5. Was this component actually necessary — could an existing one be reused?
6. Is every animation communicating something?
7. Is the visual treatment improving usability, not just appearance?
8. Is it accessible (keyboard, contrast, reduced-motion, labels)?
9. Is it responsive across 480 / 768 / 1024 / 1200+?
10. Is it performant (no bloat, no dead imports)?
11. **Does it look like a generic AI website?**

**If the answer to #11 is YES → rethink the design before shipping.**

---

## Part D — PREMIUM ≠ MORE

A premium result comes from **control and consistency**, not from adding:

- more gradients · more glow · more animation · more rounded corners · more 3D · more badges · more cards

**Subtractive design is a feature.** Removing an unnecessary element is usually the right move.

Never sacrifice usability for aesthetics. Never sacrifice aesthetics for needless engineering complexity. Never blindly follow a library's defaults.
