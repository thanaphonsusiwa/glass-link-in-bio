# Glass — Link in Bio (Game Character Edition)

A mobile-first "Link in Bio" page styled as a game character selection screen.  
Drag the video to spin Glass 360°. Tap a social icon to open the link.

---

## Project Structure

```
glass-link-in-bio/
├── app/
│   ├── layout.tsx          # Root layout + metadata + viewport
│   ├── page.tsx            # Main page (Home + TopHUD)
│   └── globals.css         # Cyberpunk theme + scanline texture
├── components/
│   ├── VideoScrubber.tsx   # Full-screen drag-to-scrub video
│   ├── CharacterStats.tsx  # Left-side glassmorphism stat panel
│   ├── FloatingSocialLinks.tsx  # Floating animated social icons
│   └── GlitchOverlay.tsx   # Random RGB glitch effect
├── hooks/
│   └── useDragScrub.ts     # Pointer drag → video.currentTime logic
├── lib/
│   └── constants.ts        # All config: character, links, theme, video URL
└── public/
    └── 360-spin.mp4        # ← DROP YOUR VIDEO HERE
```

---

## Step 1 — Add Your Video

1. Export your 360° spin video as **MP4, H.264**, vertical (9:16), 1080×1920px.
2. Copy it to `public/360-spin.mp4`.
3. Open [`lib/constants.ts`](lib/constants.ts) and confirm `VIDEO_SRC = "/360-spin.mp4"`.

> **Tip:** Keep the video under 15 MB for fast mobile loading. Use HandBrake or ffmpeg:
> ```bash
> ffmpeg -i input.mp4 -vcodec libx264 -crf 26 -preset slow -an public/360-spin.mp4
> ```

---

## Step 2 — Customize Links & Colors

Open [`lib/constants.ts`](lib/constants.ts) and edit:

| Variable | What to change |
|---|---|
| `CHARACTER` | Name, age, height, weight, role |
| `SOCIAL_LINKS[n].href` | Your actual TikTok / IG / YouTube / Facebook URLs |
| `THEME.primary` | Main neon color (default: `#00FFFF` cyan) |
| `VIDEO_SRC` | Path to your video in `/public` |

---

## Step 3 — Run Locally

```bash
npm install        # already done if you cloned
npm run dev        # http://localhost:3000
```

Open DevTools → Toggle device toolbar → choose **iPhone 14 Pro** (390×844) for the correct preview.

---

## Step 4 — Push to GitHub

```bash
# Inside the glass-link-in-bio folder:
git init
git add .
git commit -m "feat: Glass link-in-bio initial build"

# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/glass-link-in-bio.git
git branch -M main
git push -u origin main
```

---

## Step 5 — Deploy to Vercel (automatic previews)

1. Go to **vercel.com** → **Add New Project**
2. Import your `glass-link-in-bio` GitHub repo
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy** — done in ~60 seconds

Every `git push` to `main` triggers a new production deploy.  
Every pull request gets its own **preview URL** automatically.

### Custom domain (optional)
Vercel Dashboard → Your project → **Settings → Domains** → add `glass.yourdomain.com`

---

## Tuning the Scrub Feel

In [`hooks/useDragScrub.ts`](hooks/useDragScrub.ts), adjust `pixelsPerSecond`:

| Value | Feel |
|---|---|
| `40` | Very sensitive — tiny drag = big rotation |
| `80` | Default — balanced |
| `150` | Slow, deliberate — good for long videos |

The prop is also exposed via `<VideoScrubber />` → `VideoScrubberProps` if you want to make it a runtime setting.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16 | App Router, SSG |
| React | 19 | UI |
| Tailwind CSS | 4 | Styling |
| Framer Motion | 11 | Animations |
| PointerEvent API | native | Unified mouse + touch drag |
