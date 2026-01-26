import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      <button
        onClick={() => applyTheme('light')}
        className={`rounded-md p-2 transition-all hover:bg-background ${
          theme === 'light' ? 'bg-background shadow-sm' : ''
        }`}
        aria-label="Light mode"
        title="Light mode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </button>

      <button
        onClick={() => applyTheme('dark')}
        className={`rounded-md p-2 transition-all hover:bg-background ${
          theme === 'dark' ? 'bg-background shadow-sm' : ''
        }`}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>

      <button
        onClick={() => applyTheme('system')}
        className={`rounded-md p-2 transition-all hover:bg-background ${
          theme === 'system' ? 'bg-background shadow-sm' : ''
        }`}
        aria-label="System theme"
        title="System theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      </button>
    </div>
  );
}
