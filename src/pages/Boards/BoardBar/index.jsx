// MUI import
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'


// MUI Icons imoprt
import DashboardIcon from '@mui/icons-material/Dashboard'
import LockResetIcon from '@mui/icons-material/LockReset'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'

export default function BoardBar() {
  // MEnu styles
  const Menu_styles ={
    color: 'primary.main',
    bgcolor: 'white',
    paddingX: 1,
    borderRadius: '6px',
    '& .MuiSvgIcon-root': {
      color : 'primary.main'
    },
    '&:hover': {
      bgcolor : 'primary.50'
    }
  }


  return (
    <Box sx={{
      display : 'flex',
      alignItems : 'center',
      width : '100%',
      height : (theme) => theme.trello.boardBarHeight,
      justifyContent : 'space-between',
      borderTop: '1px solid #00bfa5',
      gap: 3,
      px: 2,
      overflow: 'auto'
    }} >
      <Box sx={{ display: 'flex', alignItems : 'center', gap: 2 }} >
        <Stack direction="row" spacing={1}>
          <Chip
            sx={ Menu_styles }
            label="DatleDev04"
            clickable
            icon={ <DashboardIcon /> }
          />
          <Chip
            sx={ Menu_styles }
            label="Private/Public WorkSpaces"
            clickable
            icon={ <LockResetIcon /> }
          />
          <Chip
            sx={ Menu_styles }
            label="Add To Drive"
            clickable
            icon={ <AddToDriveIcon /> }
          />
          <Chip
            sx={ Menu_styles }
            label="Automation"
            clickable
            icon={ <BoltIcon /> }
          />
          <Chip
            sx={ Menu_styles }
            label="Filters"
            clickable
            icon={ <FilterListIcon /> }
          />

        </Stack>
      </Box>

      <Box sx={{ display: 'flex', alignItems : 'center', gap: 2 }} >
        <Button startIcon={ <PersonAddAltIcon /> } variant='outlined' >Invite</Button>

        <AvatarGroup
          sx={{
            '& .MuiAvatar-root': {
              height: 34,
              width: 34,
              fontSize: 16
            },
            cursor:'pointer'
          }}
          max={4}
        >
          <Tooltip title='DatleDev' >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title='DatleDev' >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title='DatleDev' >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title='DatleDev' >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title='DatleDev' >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title='DatleDev' >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title='DatleDev' >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title='DatleDev' >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>
          <Tooltip title='DatleDev' >
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
          </Tooltip>

        </AvatarGroup>
      </Box>
    </Box>
  )
}
