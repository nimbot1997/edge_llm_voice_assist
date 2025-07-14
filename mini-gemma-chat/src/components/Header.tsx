





import { theme } from '../lib/theme';
import { clearMessages } from '../lib/storage';

export function Header() {
  const handleDeleteAll = async () => {
    if (confirm('Are you sure you want to delete all chat history? This cannot be undone.')) {
      await clearMessages();
      window.location.reload();
    }
  };

  const themeIcon = theme.get() === 'light'
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';

  return `
    <header class="navbar bg-base-100 border-b border-base-300">
      <div class="flex-1">
        <h1 class="text-xl font-bold">Mini-Gemma Chat</h1>
      </div>
      <div class="flex-none gap-2">
        <button
          class="btn btn-ghost btn-circle"
          id="theme-toggle"
          title="Toggle theme"
        >
          ${themeIcon}
        </button>
        <button
          class="btn btn-ghost btn-circle"
          id="delete-all"
          title="Delete all data"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
        </button>
      </div>
    </header>
  `;
}







