import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

import { mockData } from '~/apis/mock-data'
import { useState, useEffect } from 'react'
import { fetchBoarDetailAPI } from '~/apis'
export default function Board() {
  const [board, setBoard] = useState(null)

  const boardId = '6600275907ae95b39ea5e15d'

  useEffect(() => {
    fetchBoarDetailAPI(boardId)
      .then(board => setBoard(board))
  }, [])

  return (
    <Container disableGutters maxWidth= { false } sx={{ height: '100vh' }} >
      <AppBar/>
      {
        board &&
        <>
          <BoardBar board={board} />
          <BoardContent board={mockData?.board} />
        </>
      }
    </Container>
  )
}
