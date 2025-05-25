module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    darkMode: 'class', // Enable dark mode support
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                primaryThemeDark: '#1D4ED8',
                primaryDark: '#2560E8',
                primaryDarkThemeDark: '#1E40AF',
                primaryLight: '#93C5FD',
                colorBg: '#F1F5F9',
                colorBgDark: '#0F172A',
                colorSurface: '#FFFFFF',
                colorSurfaceDark: '#1E293B',
                colorSuccess: '#10B981',
                colorSuccessDark: '#34D399',
                colorError: '#EF4444',
                colorErrorDark: '#F87171',
                colorBorder: '#E5E7EB',
                colorBorderDark: '#334155',
                colorText: '#1E293B',
                colorTextDark: '#F1F5F9',
                colorTextLight: '#6B7280',
                colorTextLightDark: '#94A3B8',
            },
            text: {
                title: '24px',
                bigTitle: '36px',
                subtitle: '18px',
                normal: '16px',
                small: '13px',
            },
            fontFamily: {
                openSans: ['"Open Sans"', 'sans-serif'],
            },
            keyframes: {
                slide: {
                    '0%': {
                        opacity: '0',
                        translate: '0 -100px'
                    },
                    '50%': {
                        opacity: '1'
                    },
                    '100%': {
                        translate: '0 0px'
                    }
                }
            },
            animation: {
                slide: 'slide 0.3s ease-out forwards',
            },
            boxShadow: {
                'custom': '0px 3px 3px #0003',
                'customDark': '0px 3px 6px rgba(0, 0, 0, 0.3)',
                'box': '1px 1px 3px #0003',
                'boxDark': '1px 1px 4px rgba(255, 255, 255, 0.06)'
            }
        },
    },
    plugins: [],
}