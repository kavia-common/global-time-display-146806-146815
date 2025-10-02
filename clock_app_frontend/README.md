# Clock App – Ocean Professional Theme

A lightweight React app that displays the current time and allows users to select a timezone. It follows a modern "Ocean Professional" style with blue and amber accents.

## Features

- Live digital clock with second-by-second updates
- Timezone selector using IANA time zones (with fallback list)
- Responsive layout; dropdown above time on mobile, alongside on wider screens
- Ocean Professional theme with:
  - Blue (#2563EB) and Amber (#F59E0B) accents
  - Minimal UI, rounded corners, subtle shadows
  - Smooth transitions and soft gradients

## Quick Start

- `npm install`
- `npm start` (open http://localhost:3000)
- `npm test`
- `npm run build`

## Notes

- Timezones are sourced via `Intl.supportedValuesOf('timeZone')` if available; otherwise a curated fallback list is used.
- No external UI libraries are used; styles live in `src/App.css`.
- Colors and elevation are defined with CSS variables to make the theme easy to tweak.
