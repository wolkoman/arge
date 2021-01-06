const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    content: ["./pages/**/*.js", "./components/**/*.js"],
    options: { whitelist: [] },
  },
  darkMode: false,
  theme: {
    extend: {
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
        secondary: { default: "#cd309a" },
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
