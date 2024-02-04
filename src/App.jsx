import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import Container from '@mui/material/Container'
import theme from './theme'

function SelectToggle() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Mode</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={mode}
        label="mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <div style={{ display : 'flex', alignItems : 'center', gap : '8px' }} >
            <LightModeIcon />
            light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display : 'flex', alignItems : 'center', gap: 1 }} >
            <DarkModeOutlinedIcon />
            dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display : 'flex', alignItems : 'center', gap : 2 }} >
            <SettingsBrightnessIcon />
            system
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}


function App() {
  return (
    <Container disableGutters maxWidth= { false } sx={{ height: '100vh' }} >
      <Box sx={{
        display : 'flex',
        alignItems : 'center',
        backgroundColor: 'primary.light',
        height : (theme) => theme.trello.appBarHeight
      }} >
        <SelectToggle />
      </Box>
      <Box sx={{
        display : 'flex',
        alignItems : 'center',
        backgroundColor: 'primary.dark',
        height : (theme) => theme.trello.boardBarHeight
      }} >
        Board bar
      </Box>
      <Box sx={{
        display : 'flex',
        alignItems : 'center',
        // backgroundColor: 'primary.light',
        height : (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`
      }} >
        Content
      </Box>
    </Container>
  )
}

export default App
