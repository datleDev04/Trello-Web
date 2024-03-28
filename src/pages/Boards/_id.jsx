import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// MUI import
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useState, useEffect } from 'react'
import {
  createNewCardApi,
  createNewColumnApi,
  fetchBoarDetailAPI,
  updateBoarDetailAPI,
  updateColumnDetailAPI
} from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formator'
import { mockData } from '~/apis/mock-data'

// import sort funtion
import { mapOrder } from '~/utils/sorts'
import { Typography } from '@mui/material'
export default function Board() {
  const [board, setBoard] = useState(null)

  const boardId = '660514db3da5848fa62b1266'

  useEffect(() => {
    fetchBoarDetailAPI(boardId)
      .then(board => {
        board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
        // xử lí khi tồn tại column rỗng => fix không thể kéo thả
        // console.log(board.columns)
        board.columns.forEach(column => {

          if ( isEmpty(column.cards) ) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          } else {
            column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
          }
        })
        setBoard(board)
      })
  }, [])

  // call api createNewColumnn => làm mới state board
  const createNewColumn = async (newColumnData) => {
    // thêm mới
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId : board._id
    })

    // fix lỗi column rỗng cho column mới được tạo
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]


    // hiển thị, câp nhật state
    const newBoard = { ...board }
    board.columns.push(createdColumn)
    board.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // create new card
  const createNewCard = async (newCardData) => {

    const createdNewCard = await createNewCardApi({
      ...newCardData,
      boardId : board._id
    })

    const newBoard = { ...board }
    const columnToUpdate = await newBoard.columns.find(column => column._id === createdNewCard.columnId)

    if (columnToUpdate) {
      columnToUpdate.cards.push(createdNewCard)
      columnToUpdate.cardOrderIds.push(createdNewCard._id)
    }

    setBoard(newBoard)
  }

  // cập nhật lại vị trí column khi kéo thả
  const moveColumns = async (dndOrderredColumns) => {
    // cập nhật với state
    const dndOrderredColumnsIds = dndOrderredColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderredColumns
    newBoard.columnOrderIds = dndOrderredColumnsIds
    setBoard(newBoard)

    // gọi state cập nhật columnOrderIds trong db
    updateBoarDetailAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  const moveCardInSameColumn = async (dndOrderredCard, dndCardOrderIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = await newBoard.columns.find(column => column._id === columnId)

    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderredCard
      columnToUpdate.cardOrderIds = dndCardOrderIds
    }

    setBoard(newBoard)

    updateColumnDetailAPI(columnId, { cardOrderIds: dndCardOrderIds })
  }

  if (!board) {
    return (
      <Box sx= {{
        display: 'flex',
        alignItems: 'center',
        justifyContent :'center',
        gap: 2,
        width: '100wh',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography> Loading... </Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth= { false } sx={{ height: '100vh' }} >
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns = {moveColumns}
        moveCardInSameColumn = {moveCardInSameColumn}
      />
    </Container>
  )
}
