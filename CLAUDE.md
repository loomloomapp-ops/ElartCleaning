# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This repository is a **greenfield brief** for the **ElartCleaning** marketing website. No application code exists yet — only:

- `assets/Logocl.png` — brand logo.
- `assets/brief-uslugi final 2333.pdf` — Polish-language client brief defining the full service catalog and pricing (the canonical source of truth for site content).
- `.claude/rules/` — design skills checked into the repo (see below). These act as project instructions and are auto-loaded.

When asked to "build the site," "create the landing page," etc., infer stack and structure from the brief and the design rules; do not assume a framework is already wired up.

## Domain (from the brief)

ElartCleaning is a Poznań-based services company operating across Poland. The site must cover **5 service sectors**, each with its own pricing structure:

1. **Sprzątanie** (Cleaning) — offices, beauty salons, post-renovation, plus add-ons (balconies, ironing, walls, grout, kitchen appliances, extra bathrooms). Tiered Ekspres / Standard / Premium pricing per m².
2. **Czyszczenie tapicerki** (Upholstery cleaning) — mattresses, pillows, rugs, sofas/corner sofas, chairs, strollers, car interiors. Mostly fixed-price per item.
3. **Mycie okien** (Window cleaning) — commercial per m², private per window type, plus boom-lift work at high altitude (custom quote).
4. **Transport & Przeprowadzki** (Transport & moves) — all custom quote.
5. **Magazynowanie** (Storage) — guarded heated facility, custom quote.

Site copy must be in **Polish** and faithful to the brief's exact wording and prices. Do not invent services or alter prices. Items priced "wycena indywidualna" must be presented as custom-quote, not as missing data.

## Design Rules (mandatory)

`.claude/rules/` contains a stack of design skills that override default behavior. They are listed in [.claude/rules/llms.txt](.claude/rules/llms.txt). Key ones for this project:

- **taste-skill** — baseline premium frontend taste (typography, color, motion, anti-slop).
- **image-to-code-skill** — when building visual sections, generate reference images first, analyze, then code.
- **imagegen-frontend-web** — for generating website reference images.
- **brandkit** — for logo/brand-system images.
- **redesign-skill**, **soft-skill**, **minimalist-skill**, **brutalist-skill**, **gpt-tasteskill**, **stitch-skill**, **output-skill** — situational.

Hard rules these collectively enforce (do not violate without explicit user request):
- No `Inter`, no emojis, no pure `#000000`, no purple/blue "AI gradient" accents, no generic 3-equal-card feature rows, no centered hero at high variance, no `h-screen` (use `min-h-[100dvh]`).
- Use `Geist` / `Satoshi` / `Cabinet Grotesk` / `Outfit` for sans; if serif is needed, only distinctive ones (`Fraunces`, `Instrument Serif`).
- Animate only `transform` and `opacity`; isolate motion in `'use client'` leaf components.
- Read the relevant skill's `SKILL.md` in full before producing UI — they contain detailed component, spacing, and motion specs.

## Working Conventions

- This is **not** a git repository. Do not run `git` commands; there is no history to consult.
- macOS `.DS_Store` files exist throughout — ignore them; do not commit/track them.
- The working directory path contains Cyrillic characters (`проєкти claude`). Quote paths in shell commands.
- When stack is unspecified for new work, default to **Next.js (App Router) + Tailwind + Framer Motion** — this matches the assumptions baked into the design skills (RSC isolation rules, Tailwind utility classes, spring physics).
