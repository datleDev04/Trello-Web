// MUI import
import Box from '@mui/material/Box'

// import file
import ListColumns from './ListColumns/ListColumns'

// import sort funtion
import { mapOrder } from '~/utils/sorts'

// dnd-kit
import { DndContext } from '@dnd-kit/core'

export default function BoardContent( { board } ) {
  const orderredColumns = mapOrder(board.columns, board.columnOrderIds, '_id')

  // handle drag with dnd-kit
  const handleDragColumn = (e) => {
    console.log(e)
  }
  return (
    // Dnd Context wrapper to active event
    <DndContext onDragEnd={handleDragColumn} >
      {/* FULL BOARD CONTENT */}
      <Box sx={{
        width : '100%',
        height : (theme) => theme.trello.boardContentHeight,
        bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2' )
      }} >
        <ListColumns columns ={orderredColumns} />
      </Box>
    </DndContext>
  )
}
