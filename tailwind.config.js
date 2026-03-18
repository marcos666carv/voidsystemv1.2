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
            spacing: {
                '13': '3.25rem',  '15': '3.75rem',  '18': '4.5rem',
                '22': '5.5rem',   '26': '6.5rem',   '30': '7.5rem',
                '34': '8.5rem',   '38': '9.5rem',   '42': '10.5rem',
                '46': '11.5rem',  '50': '12.5rem',  '54': '13.5rem',
                '58': '14.5rem',  '66': '16.5rem',  '68': '17rem',
                '70': '17.5rem',  '74': '18.5rem',  '76': '19rem',
                '78': '19.5rem',  '82': '20.5rem',  '84': '21rem',
                '86': '21.5rem',  '88': '22rem',    '90': '22.5rem',
                '92': '23rem',    '94': '23.5rem',  '100': '25rem',
                '104': '26rem',   '108': '27rem',   '112': '28rem',
                '116': '29rem',   '120': '30rem',   '128': '32rem',
                '132': '33rem',   '136': '34rem',   '140': '35rem',
                '144': '36rem',   '160': '40rem',   '176': '44rem',
            },
        },
    },
    plugins: [],
}
