
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
    },
    
    fontFamily: {
      'sentence': 'Montserrat',
      'sen': 'Space Grotesk',
      'rajdhani': ['Rajdhani', 'sans-serif'],
    },
  },
  plugins: [],
});