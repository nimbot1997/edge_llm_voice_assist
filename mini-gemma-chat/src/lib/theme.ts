




import { atom } from 'nanostores';

export const theme = atom<'light' | 'dark'>('light');

export function toggleTheme() {
  const current = theme.get();
  const newTheme = current === 'light' ? 'dark' : 'light';
  theme.set(newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

export function initTheme() {
  const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = saved || (prefersDark ? 'dark' : 'light');
  theme.set(initialTheme);
  document.documentElement.setAttribute('data-theme', initialTheme);
}





