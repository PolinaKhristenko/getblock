module.exports = {
    // ...
  purge: {
    content: ['./public/**/*.html', './src/**/*.vue'],
    options: {
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /tooltip/,
        /popover/,
        /notification/,
      ],
    }
  },
  theme: {
    extend: {
    }, 
    colors: {
      'blue': '#11B3FE',
      'black': '#282828',
      'white': '#F6F7F8',
      'gray': '#E3EBEF',
      'light-blue': '#EAF1F7',
      
    },
    fontSize :{
      'h1': '3.125rem',
    },
    container: {
      'mb': '100%',
      'tb': '540px',
      'nt': '768',
      'xl': '1000px',
      padding: {
      }
    },
  },
}