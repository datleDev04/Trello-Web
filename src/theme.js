
// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// decalare variable
const APP_BAR_HEIGHT = '52px'
const BOARD_BAR_HEIGHT = '56px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`


// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
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
        root: { fontSize : '0.875rem' }
      }
    },

    MuiTypography: {
      styleOverrides: {
        // Name of the slot
        root: { '&.MuiTypography-body1': { fontSize : '0.875rem' } }
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
            borderRadius : '10px'
          },
          '*::-webkit-scrollbar-thumb:hover ': {
            backgroundColor: '#00b894',
            borderRadius : '10px'
          }
        }
      }
    }
  }
})
// ...other properties

export default theme
