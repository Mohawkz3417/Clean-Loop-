/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canopy: { DEFAULT: '#0E5E4A', 50: '#E7F4EF', 100: '#CDE9DE', 200: '#9BD3BD', 300: '#5FB896', 400: '#2E9C74', 500: '#14805D', 600: '#0E5E4A', 700: '#0B4A3B', 800: '#08372C', 900: '#05241D' },
        leaf: '#14A06B',
        lime: { DEFAULT: '#B6F04A', soft: '#E6FBC4', deep: '#6E9E14' },
        marigold: { DEFAULT: '#F5A524', soft: '#FDEFD3', deep: '#B4730A' },
        coral: { DEFAULT: '#F0574A', soft: '#FDE3E0', deep: '#B9362B' },
        mist: '#EEF5F1',
        ink: { DEFAULT: '#0C2620', soft: '#3D5A52', faint: '#6F8A82' },
        line: '#D5E3DC',
        night: { DEFAULT: '#081322', panel: '#0E1C31', raised: '#14263F', line: '#203656', text: '#E6EEF8', muted: '#8EA3BF' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Figtree Variable"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 1px 2px rgba(12,38,32,.06), 0 8px 24px -12px rgba(12,38,32,.18)',
        float: '0 24px 60px -24px rgba(8,55,44,.45)',
        glow: '0 0 0 1px rgba(182,240,74,.35), 0 8px 30px -8px rgba(182,240,74,.45)',
      },
      borderRadius: { xl2: '1.25rem', xl3: '1.75rem' },
      keyframes: {
        scan: { '0%': { transform: 'translateY(-10%)' }, '100%': { transform: 'translateY(110%)' } },
        pulseRing: { '0%': { transform: 'scale(.6)', opacity: '.9' }, '100%': { transform: 'scale(2.4)', opacity: '0' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
      animation: {
        scan: 'scan 1.6s cubic-bezier(.6,0,.4,1) infinite alternate',
        pulseRing: 'pulseRing 1.8s ease-out infinite',
        shimmer: 'shimmer 1.4s infinite',
        floaty: 'floaty 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
