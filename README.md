# MJ & Sharmaine Wedding Invitation 💌

Mobile-first wedding invitation — Dec 18, 2026, 08:00 AM, San Antonio-Arzadon, San Manuel, Pangasinan.

Live: `https://bautistamarkjohn53.github.io/wedding-invitation/` (same repo name — update username if forked)

## Features
- Themed preloader: preloads compressed photos/fonts first, then starts — no photo pop-in. Audio/video stream after (saves mobile data).
- Tap-friendly couple cards, collapsible Entourage (`<details>`), video poster `youandme.jpeg`, custom video controls.
- Compressed: `mj.jpg 34KB`, `maine.jpg 68KB`, `ring 20KB webp`, `you-and-me.mp4 2.4MB 720p faststart`, `wedding-audio.mp3 9MB`.

## Structure
```
wedding-invitation/
├── index.html
├── envelop.jpg (+ .webp)
├── .nojekyll
└── invitation/
    ├── style.css
    ├── script.js
    ├── img/ mj.jpg/.webp, maine.jpg/.webp, bg.jpg/.webp, youandme.jpeg/.webp, ring.png/.webp
    ├── vid/ you-and-me.mp4
    └── music/ wedding-audio.mp3
```

## Enable GitHub Pages
1. Push branch `ID_01` → merge to `main`.
2. GitHub repo → Settings → Pages → Deploy from branch → `main` / `/ (root)` → Save.
3. Wait 1-2 min, open Pages URL. Share via Messenger/WhatsApp to test OG preview (`envelop.jpg`).
4. If forked under new username, update `og:image` + `og:url` in `index.html`.

## Local test
```powershell
# any static server, e.g:
npx serve .
# or
python -m http.server 8000
```
Open `http://localhost:8000`, DevTools → 360x740 mobile, throttle Fast 4G to see preloader.
