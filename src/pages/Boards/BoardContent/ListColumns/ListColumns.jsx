// MUI import
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

//MUI icons
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'

//import file
import Column from './Column/Column'

// dnd-kit
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

import { useState } from 'react'
import { TextField } from '@mui/material'
import { toast } from 'react-toastify'

const ListColumns = ({ columns }) => {

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  const [newColTitle, setNewColTitle] = useState('')

  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
  }

  const addNewColumn = () => {
    if (!newColTitle ) {
      toast.error('Please enter the column title')
      return
    }

    // thêm xong thì đóng form thêm
    toggleOpenNewColumnForm()
    // set lại giá trị newCOLTITLE
    setNewColTitle('')
  }

  return (
    <SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
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
        { columns.map((column) => {
          return <Column key={column?._id} column={column} />
        }) }

        {/* <Column /> */}

        {/* Add collumn */}

        {
          !openNewColumnForm


            ?<Box onClick= {toggleOpenNewColumnForm} sx={{
              minWidth: 250,
              maxWidth: 250,
              mx: 2,
              borderRadius: '6px',
              bgcolor: '#ffffff3d',
              height: 'fit-content'
            }} >
              <Button
                sx={{
                  width: '100%',
                  height: '100%',
                  pl:2,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  color : 'white'
                }}
                startIcon={ <AddIcon /> }
              >Add new collumn</Button>
            </Box>


            :<Box sx={{
              minWidth: 250,
              maxWidth: 250,
              mx: 2,
              p:1,
              borderRadius: '6px',
              bgcolor: '#ffffff3d',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
              // justifyContent: 'center',
              // alignItems: 'center'
            }}>
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
                label="Enter column title"
                type="text"
                size='small'
                variant='outlined'
                autoFocus
                value={newColTitle}
                onChange={(e) => setNewColTitle(e.target.value)}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  // justifyContent: 'center',
                  alignItems: 'center'

                }}
              >
                <Button
                  variant='contained'
                  color='success'
                  size='small'
                  onClick = {addNewColumn}
                >
                  Add Column
                </Button>
                <ClearIcon
                  fontSize ='small'
                  sx={{ color: 'white', cursor: 'pointer' }}
                  onClick = {toggleOpenNewColumnForm}
                />
              </Box>
            </Box>
        }

      </Box>
    </SortableContext>
  )
}


export default ListColumns