// MUI import
import Box from '@mui/material/Box'
import Card from './Card/Card'


export default function ListCard({ listcard }) {
  return (
    <>
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
          ${theme.trello.collumnHeaderHeight} -
          ${theme.trello.collumnFooterHeight}
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
        {/* List Card  */}
        {listcard.map(card => <Card card= {card} key={card._id} /> )}
        <Card temporaryHideMedia/>


      </Box>
    </>
  )
}
