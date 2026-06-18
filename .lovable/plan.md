## Goal
Resize the homepage hero slider to feel comfortable on desktop and increase auto-play speed.

## Changes

### 1. Desktop Height
- Cap the slider at a compact size (`max-h-[420px] sm:max-h-[480px]`) so it does not dominate the viewport on large screens.
- Keep `object-contain` so images remain fully uncropped.
- Ensure text overlays, bottom gradient, and dot controls remain correctly positioned inside the new bounds.

### 2. Mobile Height
- Keep the slider presentable on mobile (no giant shrink; maintain readable text and tappable controls).

### 3. Auto-Play Interval
- Change `AUTO_MS` from `6500` to `4000` (4 seconds).
- Preserve existing pause-on-hover/focus and reduced-motion behavior.

## Technical Details
- File: `src/components/carnival-hero.tsx`
- Only container height classes and the `AUTO_MS` constant change.
- No backend, routing, or dependency changes required.