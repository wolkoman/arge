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
                    default: "#0A5C36",
                    50: "#D3F7E6",
                    500: "#127346",
                },
                secondary: {default: "#0E442B"},
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
