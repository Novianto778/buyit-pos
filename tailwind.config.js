/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {
            height: {
                receipt: 'calc(100% - 5rem)',
            },
            maxHeight: {
                dashboard: 'calc(100vh - 5rem)',
            },
        },
    },
    plugins: [],
};
