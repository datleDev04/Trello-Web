//  react import
import * as React from 'react'
import { useState } from 'react'

// MUI import
import { TextField } from '@mui/material'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// MUI icons import
import AddIcon from '@mui/icons-material/Add'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListCard from './ListCards/ListCard'
import ClearIcon from '@mui/icons-material/Clear'
import AddCardIcon from '@mui/icons-material/AddCard'


// devclare variable
const COLLUM_HEADER_HEIGHT = '52px'
const COLLUM_FOOTER_HEIGHT = '56px'

// import sort funtion
import { mapOrder } from '~/utils/sorts'

//dnd-kit
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { toast } from 'react-toastify'

const Column = ({ column, createNewCard }) => {
  // dnd-kit drag drop
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyle = {
    // fix lỗi lag trên mobile
    touchAction : 'none',
    // Sử dụng transform thì bị lỗi stretch
    // transform: CSS.Transform.toString(transform),
    // tac giả khuyên nên sd translate
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : undefined
  }

  // menu dropdown
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // handle sort card
  const orderredCards = mapOrder(column.cards, column.cardOrderIds, '_id')

  const [openNewCardForm, setOpenNewCardForm] = useState(false)

  const [newCardTitle, setNewCardTitle] = useState('')

  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
  }

  const addNewCard = async () => {
    if (!newCardTitle ) {
      toast.error('Please enter the card title', {
        position: 'bottom-right'
      })
      return
    }

    const newCard = {
      title: newCardTitle,
      columnId: column._id
    }

    await createNewCard(newCard)

    // thêm xong thì đóng form thêm
    toggleOpenNewCardForm()
    // set lại giá trị newCOLTITLE
    setNewCardTitle('')
  }

  return (
    <>
      <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes} >
        {/* Box collumn */}
        <Box
        // chỉ lắng nghe khi chuột, ngón tay chạm vào cột
        // fix lỗi chiều cao cột đang là full màn
          {...listeners}
          sx={{
            maxWidth: '270px',
            minWidth: '270px',
            border : '1px solid white',
            m : '0 8px',
            borderRadius: '6px',
            height : 'fit-content',
            bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
            maxHeight : (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5) } )`
          }}
        >
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
            > {column?.title} </Typography>

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

          {/* Listcard */}
          <ListCard listcard ={ orderredCards } />

          {/* Box collums footer */}
          <Box onClick = {toggleOpenNewCardForm} sx={{
            height: COLLUM_FOOTER_HEIGHT,
            p: 2,
            cursor: 'pointer'
          }} >
            {
              !openNewCardForm

                ?<Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  height: '100%',
                  justifyContent :'space-between'

                }}>
                  <Button >Add new card</Button>
                  <Tooltip
                    title="Add new card"
                    sx={{
                      cursor: 'pointer'
                    }}
                  >
                    <AddCardIcon sx={{ color: '#7AA2E3' }} />
                  </Tooltip>
                </Box>


                :<Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  height: '100%',
                  justifyContent: 'space-between'
                }} >
                  <TextField
                    sx={{
                      minWidth: 120,
                      color: 'blue',
                      maxWidth: 170,
                      '& label' : { color: 'text.primary' },
                      '& input' : {
                        color: (theme) => theme.palette.primary.main,
                        bgColor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                      },
                      '& label.Mui-focused' : { color: (theme) => theme.palette.primary.main },
                      '& .MuiOutlinedInput-root' : {
                        '& fieldset': {
                          borderColor :  (theme) => theme.palette.primary.main
                        },
                        '&:hover fieldset': {
                          borderColor :  (theme) => theme.palette.primary.main
                        },
                        '&.Mui-focused fieldset': {
                          borderColor :  (theme) => theme.palette.primary.main
                        }
                      }
                    }}
                    label="Enter card title"
                    type="text"
                    size='small'
                    variant='outlined'
                    autoFocus
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                      height: '100%'
                    }}
                  >
                    <Button
                      variant='contained'
                      color='success'
                      size='small'
                      onClick = {addNewCard}
                    >
                      Add
                    </Button>
                    <ClearIcon
                      fontSize ='small'
                      sx={{ color: 'blue', cursor: 'pointer' }}
                      onClick = {toggleOpenNewCardForm}
                    />
                  </Box>
                </Box>

            }
          </Box>

        </Box>
      </div>
    </>
  )
}

export default Column