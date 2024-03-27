import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

import { mockData } from '~/apis/mock-data'
import { useState, useEffect } from 'react'
import { createNewCardApi, createNewColumnApi, fetchBoarDetailAPI } from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formator'
export default function Board() {
  const [board, setBoard] = useState(null)

  const boardId = '6600275907ae95b39ea5e15d'

  useEffect(() => {
    fetchBoarDetailAPI(boardId)
      .then(board => {
        // xử lí khi tồn tại column rỗng => fix không thể kéo thả
        board.columns.forEach(column => {
          if ( isEmpty(column.cards) ) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
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

  return (
    <Container disableGutters maxWidth= { false } sx={{ height: '100vh' }} >
      <AppBar/>
      {
        board &&
        <>
          <BoardBar board={board} />
          <BoardContent
            board={board}
            createNewColumn={createNewColumn}
            createNewCard={createNewCard}
          />
        </>
      }
    </Container>
  )
}
