/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}",
        './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
    ],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ],
}
