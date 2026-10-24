import confetti from 'canvas-confetti';

export function celebrate(strong = false) {
  const colors = ['#B6F04A', '#14A06B', '#F5A524', '#ffffff', '#0E5E4A'];
  confetti({ particleCount: strong ? 140 : 80, spread: strong ? 100 : 70, origin: { y: 0.65 }, colors, scalar: 0.9, disableForReducedMotion: true });
  if (strong) setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0 }, colors, disableForReducedMotion: true }), 220);
  if (strong) setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 }, colors, disableForReducedMotion: true }), 380);
}
