/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        line: 'var(--color-line)',
        accent: 'var(--color-accent)',
        'accent-contrast': 'var(--color-accent-contrast)',
        notice: 'var(--color-notice-bg)',
        'notice-ink': 'var(--color-notice-ink)',
      },
      maxWidth: {
        page: 'var(--max-page)',
      },
    },
  },
  plugins: [],
}
