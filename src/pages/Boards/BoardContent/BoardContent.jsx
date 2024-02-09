// MUI import
import Box from '@mui/material/Box'

// import file
import ListColumns from './ListColumns/ListColumns'

export default function BoardContent( { board } ) {
  return (
    // FULL BOARD CONTENT
    <Box sx={{
      width : '100%',
      height : (theme) => theme.trello.boardContentHeight,
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2' )
    }} >
      <ListColumns collumns ={board?.columns} />
    </Box>
  )
}
