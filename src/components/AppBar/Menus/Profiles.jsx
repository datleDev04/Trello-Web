import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account Settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              alt='mèo mèo'
              src='data:image/jpeg;base64,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'
              sx={{ width: 34, height: 34 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}