module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                primaryDark: '#2560E8',
                colorBg: '#F1F5F9',
                colorSurface: '#FFFFFF',
                colorSuccess: '#10B981',
                colorError: '#EF4444',
                colorBorder: '#E5E7EB',
                colorText: '#1E293B',
                colorTextLight: '#6B7280',
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
        },
    },
    plugins: [],
}