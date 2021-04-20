const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: [
      "./pages/**/*.tsx",
      "./components/**/*.tsx",
      "./util/markdownRenderer.tsx",
    ],
    options: { whitelist: [] },
  },
  darkMode: false,
  theme: {
    minHeight: {
      'md': '200px',
    },
    extend: {
      rotate:{
        '135': '135deg'
      },
      screens: {
        print: {'raw': 'print'}
      },
      colors: {
        primary: {
          default: "#167AAC",
          50: "#e5f6ff",
          100: "#9CD5F2",
          200: "#6FC2EC",
          300: "#41AFE6",
          400: "#1C9AD9",
          500: "#167AAC",
          600: "#105A7E",
          700: "#0B3A51",
          800: "#051A24",
          900: "#000000",
        },
        secondary: { default: "#94464D" },
      },
      height: {
        xl: "200px",
        "2xl": "400px",
        "3xl": "500px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
