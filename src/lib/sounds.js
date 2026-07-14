/** Tiny Web Audio tones — no asset files */

let ctx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function beep({ freq = 880, duration = 0.12, type = 'sine', gain = 0.08, slideTo }) {
  const ac = getCtx();
  if (!ac) return;
  if (ac.state === 'suspended') ac.resume().catch(() => {});
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ac.currentTime);
  if (slideTo != null) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), ac.currentTime + duration);
  }
  g.gain.setValueAtTime(gain, ac.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + duration + 0.02);
}

export function playCorrect(muted) {
  if (muted) return;
  beep({ freq: 660, duration: 0.08, gain: 0.07 });
  setTimeout(() => beep({ freq: 880, duration: 0.1, gain: 0.07 }), 70);
}

export function playWrong(muted) {
  if (muted) return;
  beep({ freq: 220, duration: 0.18, type: 'triangle', gain: 0.06, slideTo: 140 });
}
