import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme} >
    {/* Chuẩn hóa css tạo sự nhất quán ở nhiều các trình duyệt khác nhau */}
    <CssBaseline />
    <App />
    <ToastContainer
      position='bottom-left' theme='dark'
    />
  </CssVarsProvider>
)
