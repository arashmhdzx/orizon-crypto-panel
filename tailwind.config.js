module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                'custom-1': '0px 10px 55px -14px rgba(0,0,0 ,.61)',
            },
            colors: {
                "primary--color": "#2B00D4",
                "primary--color-100": "#574CCB",
                "text-default": "#BAC0CA",
                "body-1": "#F7F7FA"
            },
            spacing: {
                "1-m": "4px",
                "2-m": "8px",
                "3-m": "12px",
                "4-m": "18px",
                "5-m": "24px",
                // "6-m":"px",
            }
        },
    },
    plugins: [],
}