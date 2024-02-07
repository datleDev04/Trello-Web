// React import
import * as React from 'react'

// MUI import
import ModeSelect from '~/components/ModeSelect'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import Profile from './Menus/Profiles'
import InputAdornment from '@mui/material/InputAdornment'

// mui icons import
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

export default function AppBar() {
  const [searchValue, setSearchValue] = React.useState('')
  return (
    <Box px={2} sx={{
      display : 'flex',
      alignItems : 'center',
      height : (theme) => theme.trello.appBarHeight,
      width : '100%',
      justifyContent : 'space-between',
      gap: 3,
      overflow: 'auto',
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#34495e' : '#1565c0' )
    }} >

      <Box sx={{ display: 'flex', alignItems : 'center', gap: 2 }} >
        <AppsIcon sx={{ color : 'white' }} />

        <Box sx={{ display: 'flex', alignItems : 'center', gap: 0.5 }} >
          <SvgIcon sx={{ color : 'white' }} fontSize="small" component={TrelloIcon} inheritViewBox />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color : 'white' }} >Trello</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap:1 }} >
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{ color: 'white' }}
            startIcon={<LibraryAddIcon/> }
            variant='outlined'
          >Create</Button>
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems : 'center', gap: 2 }} >
        <TextField
          sx={{
            minWidth: 120,
            color: 'white',
            maxWidth: 170,
            '& label' : { color: 'white' },
            '& input' : { color: 'white' },
            '& label.Mui-focused' : { color: 'white' },
            '& .MuiOutlinedInput-root' : {
              '& fieldset': {
                borderColor : 'white'
              },
              '&:hover fieldset': {
                borderColor : 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor : 'white'
              }
            }
          }}
          id="outlined-search"
          label="Search..."
          type="text"
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              searchValue &&
              <ClearIcon
                fontSize ='small'
                sx={{ color: 'white', cursor: 'pointer' }}
                onClick = {() => setSearchValue('')}
              />
            )
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor : 'pointer' }}>
            <NotificationsNoneIcon sx={{ color : 'white' }} />
          </Badge>
        </Tooltip>


        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color : 'white' }} />
        </Tooltip>

        <Profile />
      </Box>

    </Box>
  )
}
