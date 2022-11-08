const colors = require("tailwindcss/colors");

module.exports = {
    content: [
        "./pages/**/*.tsx",
        "./components/**/*.tsx",
        "./util/markdownRenderer.tsx",
    ],
    theme: {
        minHeight: {
            'md': '200px',
        },
        extend: {
            rotate: {
                '135': '135deg'
            },
            screens: {
                print: {'raw': 'print'}
            },
            colors: {
                primary: {
                    default: "#333",
                    50: "#ffffff",
                    500: "#333",
                },
                secondary: {default: "#333", 50: "#ddd"},
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
