// MUI import
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

// MUI icons import
import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'

export default function Card({ card }) {
  // hàm trả về điều kiện in cardAction khi tồn tại 1 trong 3 trường
  const shouldShowCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <>
      <MuiCard sx={{
        cursor:'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset'
      }}>
        {/* Ảnh bìa của card */}
        {card?.cover && <CardMedia sx={{ height: 140 }} image={ card.cover } /> }

        {/* Tiêu đề của card */}
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography >{card?.title}</Typography>
        </CardContent>

        {/* Khi tồn lại 1 trong 3 mục thì mới in cardAction */}
        { shouldShowCardAction &&
          <CardActions sx={{ p: '0 4px 8px 4px' }} >
            {/* Lấy điều kiện giá trị boolean
              card?.memberIds?.length : không tin button nhưng in ra độ dài của card
              !card?.memberIds?.length : điều kiện không đúng ( vì nếu length> 0 là true thì !true = false => không in ra )
              !!card?.memberIds?.length : điều kiện đúng
            */}
            {!!card?.memberIds?.length && <Button startIcon= { <GroupIcon /> } size="small">{card?.memberIds?.length}</Button> }
            {!!card?.comments?.length && <Button startIcon= { <CommentIcon /> } size="small">{card?.comments?.length}</Button> }
            {!!card?.attachments?.length && <Button startIcon= { <AttachmentIcon /> } size="small">{card?.attachments?.length}</Button> }
          </CardActions>
        }

      </MuiCard>
    </>
  )
}
