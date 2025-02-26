module.exports = {
    theme: {
      extend: {
        keyframes: {
          pulse: {
            '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(255,215,0,0.3))' },
            '50%': { filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.7))' },
          }
        },
        animation: {
          pulse: 'pulse 1s ease-in-out infinite',
        }
      }
    }
  }