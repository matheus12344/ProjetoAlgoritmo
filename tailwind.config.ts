import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        // Custom colors for André Fiker brand
                        'blue-900': '#0B3D91',
                        'blue-800': '#0A2E7A',
                        'blue-700': '#092363',
                        'blue-600': '#2563EB',
                        'blue-500': '#3B82F6',
                        'blue-400': '#60A5FA',
                        'green-600': '#25D366',
                        'green-700': '#128C7E',
                        'green-500': '#10B981',
                        'purple-900': '#581C87',
                        'purple-600': '#9333EA',
                        'purple-500': '#A855F7',
                        'purple-400': '#C084FC',
                        'pink-500': '#EC4899',
                        'pink-400': '#F472B6',
                        'rose-500': '#F43F5E',
                        'yellow-400': '#FACC15',
                        'yellow-500': '#EAB308',
                        'orange-500': '#F97316',
                        'teal-500': '#14B8A6',
                        'teal-400': '#2DD4BF',
                        'indigo-500': '#6366F1',
                        'indigo-400': '#818CF8',
                        'slate-900': '#0F172A',
                        'slate-800': '#1E293B'
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)',
                        '2xl': '1rem'
                },
                fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                        display: ['Sora', 'system-ui', 'sans-serif']
                },
                animation: {
                        'fade-in': 'fadeIn 0.5s ease-in-out',
                        'slide-up': 'slideUp 0.5s ease-out',
                        'slide-down': 'slideDown 0.5s ease-out',
                        'slide-left': 'slideLeft 0.5s ease-out',
                        'slide-right': 'slideRight 0.5s ease-out',
                        'scale-in': 'scaleIn 0.3s ease-out',
                        'bounce-gentle': 'bounceGentle 2s infinite',
                        'pulse-slow': 'pulseSlow 3s infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'glow': 'glow 2s ease-in-out infinite alternate',
                        'spin-slow': 'spinSlow 3s linear infinite',
                        'wiggle': 'wiggle 1s ease-in-out infinite',
                        'gradient-x': 'gradientX 15s ease infinite',
                        'gradient-y': 'gradientY 15s ease infinite',
                        'gradient-xy': 'gradientXY 15s ease infinite'
                },
                keyframes: {
                        fadeIn: {
                                '0%': { opacity: '0' },
                                '100%': { opacity: '1' }
                        },
                        slideUp: {
                                '0%': { transform: 'translateY(20px)', opacity: '0' },
                                '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        slideDown: {
                                '0%': { transform: 'translateY(-20px)', opacity: '0' },
                                '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        slideLeft: {
                                '0%': { transform: 'translateX(20px)', opacity: '0' },
                                '100%': { transform: 'translateX(0)', opacity: '1' }
                        },
                        slideRight: {
                                '0%': { transform: 'translateX(-20px)', opacity: '0' },
                                '100%': { transform: 'translateX(0)', opacity: '1' }
                        },
                        scaleIn: {
                                '0%': { transform: 'scale(0.8)', opacity: '0' },
                                '100%': { transform: 'scale(1)', opacity: '1' }
                        },
                        bounceGentle: {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-10px)' }
                        },
                        pulseSlow: {
                                '0%, 100%': { opacity: '1' },
                                '50%': { opacity: '0.7' }
                        },
                        float: {
                                '0%, 100%': { transform: 'translateY(0px)' },
                                '50%': { transform: 'translateY(-20px)' }
                        },
                        glow: {
                                '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
                                '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' }
                        },
                        spinSlow: {
                                '0%': { transform: 'rotate(0deg)' },
                                '100%': { transform: 'rotate(360deg)' }
                        },
                        wiggle: {
                                '0%, 100%': { transform: 'rotate(-3deg)' },
                                '50%': { transform: 'rotate(3deg)' }
                        },
                        gradientX: {
                                '0%, 100%': { backgroundPosition: '0% 50%' },
                                '50%': { backgroundPosition: '100% 50%' }
                        },
                        gradientY: {
                                '0%, 100%': { backgroundPosition: '50% 0%' },
                                '50%': { backgroundPosition: '50% 100%' }
                        },
                        gradientXY: {
                                '0%, 100%': { backgroundPosition: '0% 0%' },
                                '25%': { backgroundPosition: '100% 0%' },
                                '50%': { backgroundPosition: '100% 100%' },
                                '75%': { backgroundPosition: '0% 100%' }
                        }
                }
        }
  },
  plugins: [tailwindcssAnimate],
};
export default config;
