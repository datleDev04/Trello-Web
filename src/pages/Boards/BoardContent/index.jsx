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
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

// MUI icons import
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddIcon from '@mui/icons-material/Add'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

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
    // FULL BOARD CONTENT
    <Box sx={{
      width : '100%',
      height : (theme) => theme.trello.boardContentHeight,
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2' )
    }} >
      <Box sx={{
        overflowY: 'hidden',
        overflowX: 'auto',
        display : 'flex',
        width: '100%',
        height: '100%',
        bgcolor: 'inherit',
        p: '10px 0',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Box collum 1 */}
        <Box sx={{
          maxWidth: '270px',
          minWidth: '270px',
          border : '1px solid white',
          m : '0 8px',
          borderRadius: '6px',
          height : 'fit-content',
          bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
          maxHeight : (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5) } )`
        }}>
          {/* Box collum header */}
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
                fontSize: '1rem',
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

          {/* Box collum list content */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: '0 5px',
            m: '0 5px',
            maxHeight : (theme) => `calc(
              ${theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} -
              ${COLLUM_HEADER_HEIGHT} -
              ${COLLUM_FOOTER_HEIGHT} 
            )`,
            overflowX: 'hidden',
            overflowY : 'auto',
            '&::-webkit-scrollbar-thumb ': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover ': {
              backgroundColor: '#bfc2cf'
            }
          }} >
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button startIcon= { <GroupIcon /> } size="small">20</Button>
                <Button startIcon= { <CommentIcon /> } size="small">10</Button>
                <Button startIcon= { <AttachmentIcon /> } size="small">5</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>

          </Box>

          {/* Box collums footer */}
          <Box sx={{
            height: COLLUM_FOOTER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent :'space-between',
            p: 2
          }} >
            <Button >Add new card</Button>
            <Tooltip
              title="Drag to move"
              sx={{
                cursor: 'pointer'
              }}
            >
              <DragHandleIcon />
            </Tooltip>
          </Box>

        </Box>

        {/* Box collum 2 */}
        <Box sx={{
          maxWidth: '270px',
          minWidth: '270px',
          border : '1px solid white',
          ml : 2,
          borderRadius: '6px',
          height : 'fit-content',
          bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
          maxHeight : (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5) } )`
        }}>
          {/* Box collum header */}
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
                fontSize: '1rem',
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

          {/* Box collum list content */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: '0 5px',
            m: '0 5px',
            maxHeight : (theme) => `calc(
              ${theme.trello.boardContentHeight} - 
              ${theme.spacing(5)} -
              ${COLLUM_HEADER_HEIGHT} -
              ${COLLUM_FOOTER_HEIGHT} 
            )`,
            overflowX: 'hidden',
            overflowY : 'auto',
            '&::-webkit-scrollbar-thumb ': {
              backgroundColor: '#ced0da'
            },
            '&::-webkit-scrollbar-thumb:hover ': {
              backgroundColor: '#bfc2cf'
            }
          }} >
            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }} >
                <Button startIcon= { <GroupIcon /> } size="small">20</Button>
                <Button startIcon= { <CommentIcon /> } size="small">10</Button>
                <Button startIcon= { <AttachmentIcon /> } size="small">5</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}>
              <CardContent
                sx={{
                  p: 1.5,
                  '&:last-child': { p: 1.5 }
                }}
              >
                <Typography >Lizard 222</Typography>
              </CardContent>

            </Card>
          </Box>

          {/* Box collums footer */}
          <Box sx={{
            height: COLLUM_FOOTER_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent :'space-between',
            p: 2
          }} >
            <Button >Add new card</Button>
            <Tooltip
              title="Drag to move"
              sx={{
                cursor: 'pointer'
              }}
            >
              <DragHandleIcon />
            </Tooltip>
          </Box>

        </Box>
      </Box>
    </Box>
  )
}
