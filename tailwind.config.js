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
          default: "#467db6",
          50: "#e5f6ff",
          500: "#467db6",
        },
        secondary: { default: "#9E0000", 50: "#eda5a5" },
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
