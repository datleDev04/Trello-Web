
// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '52px',
    boardBarHeight: '62px'
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary : teal,
    //     secondary : deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary : cyan,
    //     secondary : orange
    //   }
    // }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform : 'none',
          borderWidth : '0.5px !important'
        }
      }
    },

    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => {
          return {
            colors : theme.palette.primary.main,
            fontSize : '0.875rem'
          }
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize : '0.875rem',
          '& fieldset': { borderWidth : '0.5px !important' },
          '&:hover fieldset': { borderWidth : '1px !important' },
          '&.Mui-focused fieldset': { borderWidth : '1px !important' }
        }
      }
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width:'5px',
            height: '5px'
          },
          '*::-webkit-scrollbar-thumb ': {
            backgroundColor: '#dcdde1',
            borderRadius : '8px'
          },
          '*::-webkit-scrollbar-thumb:hover ': {
            backgroundColor: '#00b894',
            borderRadius : '8px'
          }
        }
      }
    }
  }
})
// ...other properties

export default theme
