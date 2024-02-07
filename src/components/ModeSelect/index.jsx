import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'


function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl size="small" sx={{ minWidth: 120 }} >
      <InputLabel sx ={{ color: 'white' }} id="demo-select-small-label">Mode</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={mode}
        label="mode"
        onChange={handleChange}
        sx ={{
          cursor : 'pointer',
          color : 'white',
          '.MuiOutlinedInput-notchedOutline' : { borderColor : 'white' },
          '&:hover .MuiOutlinedInput-notchedOutline' : { borderColor : 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline' : { borderColor : 'white' },
          '.MuiSvgIcon-root' : { color : 'white' }
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display : 'flex', alignItems : 'center', gap : 1 }} >
            <LightModeIcon />
            light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display : 'flex', alignItems : 'center', gap: 1 }} >
            <DarkModeOutlinedIcon />
            dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display : 'flex', alignItems : 'center', gap : 1 }} >
            <SettingsBrightnessIcon />
            system
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect