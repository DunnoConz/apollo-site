/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/@nuxt/ui/dist/runtime/**/*.{js,mjs,ts,vue}"
  ],
  theme: {
    extend: {
      borderRadius: {
        'lg': '0.5rem',
        'md': '0.375rem',
        'sm': '0.25rem'
      }
    },
  },
  plugins: [],
  safelist: [
    'rounded-lg',
    'rounded-md',
    'rounded-sm'
  ]
} 