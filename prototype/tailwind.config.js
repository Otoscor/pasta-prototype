/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        // Dark theme
        'bg-primary':   '#0D1117',
        'bg-secondary': '#1A1F2E',
        'bg-card':      '#1C212C',
        'bg-card-el':   '#252D3D',
        'bg-input':     '#2A3142',
        'accent':       '#F5C518',
        'accent-hover': '#E0B115',
        'accent-mint':  '#4ECDC4',
        'accent-red':   '#E53E3E',
        'text-primary': '#FFFFFF',
        'text-secondary':'#8B95A5',
        'text-tertiary': '#5A6477',
        'text-on-accent':'#1A1A1A',
        'border-dark':  '#2E3648',
        // Light theme (dashboard & shop)
        'lt-bg':        '#F2F2F7',
        'lt-card':      '#FFFFFF',
        'lt-card-el':   '#F9F9F9',
        'lt-input':     '#E5E5EA',
        'lt-text':      '#1C1C1E',
        'lt-secondary': '#8E8E93',
        'lt-tertiary':  '#AEAEB2',
        'lt-border':    '#D1D1D6',
        'lt-red':       '#FF3B30',
        'lt-orange':    '#FF9500',
        'lt-blue':      '#007AFF',
        'lt-green':     '#34C759',
      },
      borderRadius: {
        'sm':  '8px',
        'md':  '12px',
        'lg':  '16px',
        'xl':  '20px',
      },
      spacing: {
        'xs':   '4px',
        'sm':   '8px',
        'md':   '12px',
        'base': '16px',
        'lg':   '20px',
        'xl':   '24px',
        '2xl':  '32px',
      },
    },
  },
  plugins: [],
}
