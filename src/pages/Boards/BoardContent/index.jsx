//  react import
import * as React from 'react'

// MUI import
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// MUI icons import
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'


// devclare variable
const COLLUM_HEADER_HEIGHT = '52px'
const COLLUM_FOOTER_HEIGHT = '56px'

export default function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      display : 'flex',
      width : '100%',
      height : (theme) => theme.trello.boardContentHeight,
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2' )
    }} >
      {/* Box collum */}
      <Box sx={{
        maxWidth: 270,
        minWidth: 270,
        bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
        border: '1px solid white',
        ml : 2,
        borderRadius: '6px'
      }}>
        <Box sx={{
          height: COLLUM_HEADER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent :'space-between',
          p: 2
        }} >
          <Typography
            variant='h6'
            sx={{
              cursor: 'pointer',
              fontWeight: 'blod'
            }}
          > This is header </Typography>

          <Box >
            <Tooltip title="More options" >
              <ExpandMoreIcon
                id="basic-button-recent"
                aria-controls={open ? 'basic-menu-dropdown-col' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  cursor: 'pointer'
                }}
              />
            </Tooltip>
            <Menu
              id="basic-menu-dropdown-col"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-collum-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this collum</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this collum</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box sx={{

        }} >
          lisst carrd
        </Box>

        <Box sx={{
          height: COLLUM_FOOTER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent :'space-between',
          p: 2
        }} >
          <Button >Add new card</Button>
        </Box>

      </Box>
    </Box>
  )
}
