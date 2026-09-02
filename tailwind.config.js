/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#00502e',
                    container: '#00381f',
                },
                'on-primary': '#ffffff',
                surface: '#ffffff',
                'on-surface': '#111827',
                'on-surface-variant': '#4b5563',
                background: '#f9fafb',
                'on-background': '#111827',
                border: '#e5e7eb',
                'cpsu-gold': '#fbbf24',
            },
            fontFamily: {
                body: ['Inter', sans - serif],
            },
        },
    },
    plugins: [],
};