import confetti from 'canvas-confetti';

export function fireConfetti() {
  confetti({
    particleCount: 70,
    spread: 68,
    origin: { y: 0.65 },
    colors: ['#0d6e6e', '#2d7a4f', '#c45c48', '#f7f4ef'],
  });
}

export function fireBigConfetti() {
  confetti({ particleCount: 120, spread: 55, origin: { y: 0.6 } });
  setTimeout(
    () => confetti({ particleCount: 80, angle: 60, spread: 50, origin: { x: 0.2, y: 0.7 } }),
    150,
  );
  setTimeout(
    () => confetti({ particleCount: 80, angle: 120, spread: 50, origin: { x: 0.8, y: 0.7 } }),
    150,
  );
}
