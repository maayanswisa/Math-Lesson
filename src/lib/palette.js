/** פלטת צבעים חיה שמסתובבת בין כרטיסים (כיתות, אשכולות, נושאים) */
export const ACCENTS = [
  { name: 'teal', text: 'var(--color-teal-dark)', bg: 'rgba(13, 110, 110, 0.12)', ring: 'rgba(13, 110, 110, 0.35)', solid: 'var(--color-teal)' },
  { name: 'coral', text: 'var(--color-coral)', bg: 'rgba(196, 92, 72, 0.12)', ring: 'rgba(196, 92, 72, 0.35)', solid: 'var(--color-coral)' },
  { name: 'violet', text: 'var(--color-violet-dark)', bg: 'rgba(124, 77, 204, 0.12)', ring: 'rgba(124, 77, 204, 0.35)', solid: 'var(--color-violet)' },
  { name: 'sky', text: 'var(--color-sky-dark)', bg: 'rgba(31, 143, 224, 0.12)', ring: 'rgba(31, 143, 224, 0.35)', solid: 'var(--color-sky)' },
  { name: 'sunshine', text: 'var(--color-sunshine-dark)', bg: 'rgba(226, 160, 32, 0.15)', ring: 'rgba(226, 160, 32, 0.4)', solid: 'var(--color-sunshine)' },
  { name: 'berry', text: 'var(--color-berry-dark)', bg: 'rgba(209, 72, 127, 0.12)', ring: 'rgba(209, 72, 127, 0.35)', solid: 'var(--color-berry)' },
  { name: 'grass', text: 'var(--color-grass-dark)', bg: 'rgba(63, 161, 90, 0.12)', ring: 'rgba(63, 161, 90, 0.35)', solid: 'var(--color-grass)' },
];

export function accentFor(index) {
  return ACCENTS[index % ACCENTS.length];
}
