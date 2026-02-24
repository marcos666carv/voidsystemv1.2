/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                lilac: {
                    50: '#F5F0FA',
                    100: '#EDE4F7',
                    200: '#DCC8F0',
                    300: '#CCB0F0',
                    400: '#B898E0',
                    500: '#A880D0',
                    600: '#9060C0',
                    700: '#7548A0',
                    800: '#5A3580',
                    900: '#3F2460',
                    950: '#241440',
                },
                void: {
                    50: '#E8F0F4',
                    100: '#C8DBE3',
                    200: '#9BBCC9',
                    300: '#6E9DAF',
                    400: '#4A7E95',
                    500: '#2E5F7A',
                    600: '#1A4560',
                    700: '#103549',
                    800: '#08283B',
                    900: '#051C2A',
                    950: '#030F18',
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            animation: {
                "spin-slow": "spin 8s linear infinite",
            },
        },
    },
    plugins: [],
}
