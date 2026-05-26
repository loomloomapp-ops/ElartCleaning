# Elart Cleaning — Premium Service Website

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.

## Stack
- Next.js App Router
- Tailwind (custom burgundy/gold palette)
- Framer Motion (premium springs / fade-ups)
- Radix UI (Dialog, Accordion, Tabs)
- React Hook Form + Zod (form validation)

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Replace placeholders

All placeholders are centralized in [lib/constants.ts](lib/constants.ts):

| Placeholder | What |
|---|---|
| `[PLACEHOLDER_PHONE]` | Company phone & WhatsApp |
| `[PLACEHOLDER_HERO_IMAGE]` | Hero collage main image |
| `[PLACEHOLDER_REVIEW_IMAGE_1/2]` | Photo reviews |
| `[PLACEHOLDER_YOUTUBE_REVIEW_URL_1/2]` | YouTube review URLs (full URL or video ID) |
| `[PLACEHOLDER_GOOGLE_MAPS_POZNAN]` | Google Maps embed URL for footer |

Prices in [lib/content.ts](lib/content.ts) (`PRICES`) come from the official brief PDF.

## i18n
PL is default. EN toggle is in the header (and mobile menu). State persists in `localStorage`.

## Lead capture
- Header WhatsApp button
- Hero primary CTA → WhatsApp prefilled
- Service & price cards → popup form
- CTA banners (×2) → WhatsApp
- Quiz (5 steps + contact) → WhatsApp prefill / email fallback
- Contact form → opens default mail client (mailto with prefilled body)
- Floating widget (desktop, bottom-right) → popup
- Mobile sticky bar → popup + WhatsApp shortcut
- Exit-intent popup (once per session)
