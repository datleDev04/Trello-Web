import Box from '@mui/material/Box'

export default function BoardContent() {
  return (
    <Box sx={{
      display : 'flex',
      width : '100%',
      alignItems : 'center',
      height : (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      bgcolor: 'primary.main'
    }} >
        Content
    </Box>
  )
}
