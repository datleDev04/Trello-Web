// MUI import
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

//MUI icons
import AddIcon from '@mui/icons-material/Add'

//import file
import Column from './Column/Column'

// dnd-kit
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
const ListColumns = ({ columns }) => {
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
        <Box sx={{
          minWidth: 200,
          maxWidth: 200,
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
      </Box>
    </SortableContext>
  )
}

export default ListColumns