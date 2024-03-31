/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#84898C',
        'custom-dark': '#1e1f20',
        'custom-light-gray': '#adb1b3',
        'custom-dark-gray': '#434547',
        'input-bg': '#3b3c3e',
        disabled: '#134a66',
        enabled: '#62e2fe'
      }
    }
  },
  variants: {
    extend: {
      textColor: ['placeholder']
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
