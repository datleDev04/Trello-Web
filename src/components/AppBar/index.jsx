// React import
import * as React from 'react'

// MUI import
import ModeSelect from '~/components/ModeSelect'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profile from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

export default function AppBar() {
  const [invisible, setInvisible] = React.useState(false)
  return (
    <Box px={2} sx={{
      display : 'flex',
      alignItems : 'center',
      height : (theme) => theme.trello.appBarHeight,
      width : '100%',
      justifyContent : 'space-between',
      gap: 3,
      overflow: 'auto'
    }} >

      <Box sx={{ display: 'flex', alignItems : 'center', gap: 2 }} >
        <AppsIcon sx={{ color : 'primary.main' }} />

        <Box sx={{ display: 'flex', alignItems : 'center', gap: 0.5 }} >
          <SvgIcon sx={{ color : 'primary.main' }} fontSize="small" component={TrelloIcon} inheritViewBox />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color : 'primary.main' }} >Trello</Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap:1 }} >
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />
          <Button startIcon={<LibraryAddIcon/>} variant='outlined' >Create</Button>
        </Box>

      </Box>

      <Box sx={{ display: 'flex', alignItems : 'center', gap: 2 }} >
        <TextField sx={{ minWidth: 120 }} id="outlined-search" label="Search..." type="search" size='small' />

        <ModeSelect />

        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" invisible={invisible} sx={{ cursor : 'pointer' }}>
            <NotificationsNoneIcon sx={{ color : 'primary.main' }} />
          </Badge>
        </Tooltip>


        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color : 'primary.main' }} />
        </Tooltip>

        <Profile />
      </Box>

    </Box>
  )
}
