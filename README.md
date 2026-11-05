# Australian Indian Orchestra — Redesigned Website

A modern Next.js redesign of the AIO website with:
- **3D card elements** with tilt/hover effects
- **Auto-play banner music** that stops when scrolled past
- **Particle canvas** background in the hero
- **Animated stats** that count up on scroll
- **Fully responsive** (mobile → desktop)
- Preserves original **black + red** brand colors

---

## Setup

```bash
# Install dependencies
npm install

# Add your audio file to /public
# Name it: orchestra-theme.mp3
# (or update the audioSrc prop in src/app/page.tsx)

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

---

## Music Feature

The `MusicPlayer` component in `src/components/MusicPlayer.tsx` handles:

1. **Auto-play on load** — Attempts to play as soon as the page loads. If the browser blocks autoplay (most modern browsers require a user gesture), it waits for the first click/tap/keypress and then starts playing.

2. **Stop when banner scrolled** — Uses an `IntersectionObserver` + scroll listener to detect when `#hero-banner` (the full-screen hero section) has been completely scrolled past. Music fades out smoothly and stops.

3. **Resume on scroll back** — If the user scrolls back up so the banner is visible again, music resumes automatically.

4. **Floating control pill** — Bottom-right corner shows current state, play/pause button, and mute toggle. Changes style when music is stopped.

### To use your own audio

```tsx
// In src/app/page.tsx, update:
<MusicPlayer audioSrc="/your-track.mp3" />
```

Place your `.mp3` file in the `/public` folder.

---

## Color Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--black` | `#0a0a0a` | Page background |
| `--deep` | `#111111` | Section backgrounds |
| `--card` | `#161616` | Card backgrounds |
| `--red` | `#c8102e` | Primary accent |
| `--red-light` | `#e8243e` | Hover states |
| `--white` | `#f5f5f5` | Text |
| `--grey` | `#888888` | Muted text |

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Main page assembly
│   └── globals.css     # Global styles, animations
└── components/
    ├── Navbar.tsx       # Sticky nav with mobile menu
    ├── HeroBanner.tsx   # Full-screen hero with canvas particles
    ├── StatsSection.tsx # Animated number cards
    ├── VideosSection.tsx# Video cards with YouTube links
    ├── EventsSection.tsx# Tour dates cards
    ├── GallerySection.tsx # Photo gallery grid
    ├── Footer.tsx       # Footer with links
    └── MusicPlayer.tsx  # Auto-play music with scroll detection
```
