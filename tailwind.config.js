/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gin: {  
          DEFAULT: '#EAF3ED',  
          50: '#EAF3ED',  
          100: '#D8E9DE',  
          200: '#B4D4BF',  
          300: '#91C0A1',  
          400: '#6DAC82',  
          500: '#528F66',  
          600: '#3D6B4D',  
          700: '#294733',  
          800: '#14241A',  
          900: '#000000',
        },
        greenKelp: {  
          DEFAULT: '#203126',  
          50: '#6B9E7D',  
          100: '#609473',  
          200: '#507B5F',  
          300: '#40624C',  
          400: '#304A39',  
          500: '#203126',  
          600: '#0A0F0C',  
          700: '#000000',  
          800: '#000000',  
          900: '#000000'
        },
        'seaMist': {
          DEFAULT: '#C6DCCD',
          '50': '#FFFFFF',
          '100': '#FFFFFF',
          '200': '#FFFFFF',
          '300': '#F9FBF9',
          '400': '#DFECE3',
          '500': '#C6DCCD',
          '600': '#A3C7AF',
          '700': '#80B190',
          '800': '#5F9B72',
          '900': '#4A7858'
        },
        'stiletto': {
          DEFAULT: '#A6323D',
          '50': '#E5AAB0',
          '100': '#E19AA1',
          '200': '#D77B84',
          '300': '#CE5C67',
          '400': '#C43C49',
          '500': '#A6323D',
          '600': '#7B252D',
          '700': '#50181D',
          '800': '#250B0D',
          '900': '#000000'
        },
      }
    }
  },
  plugins: [],
}
