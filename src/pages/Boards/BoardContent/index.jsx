import Box from '@mui/material/Box'

export default function BoardContent() {
  return (
    <Box sx={{
      display : 'flex',
      width : '100%',
      alignItems : 'center',
      height : (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2' )
    }} >
        Content
    </Box>
  )
}
