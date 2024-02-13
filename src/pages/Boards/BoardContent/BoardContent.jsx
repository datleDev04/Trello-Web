// MUI import
import Box from '@mui/material/Box'

// import file
import ListColumns from './ListColumns/ListColumns'

// import sort funtion
import { mapOrder } from '~/utils/sorts'

// dnd-kit
import { arrayMove } from '@dnd-kit/sortable'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'


export default function BoardContent( { board } ) {
  const [orderredColumns, setOrderredColumns] = useState([])

  useEffect(() => {
    setOrderredColumns(mapOrder(board.columns, board.columnOrderIds, '_id'))
  }, [board])

  const mouseSensor = useSensor(MouseSensor, {
    // yêu cầu người dùng phải di chuyển chuột 10px thì mới được phép kéo thả
    // => fix lỗi khi chỉ bấm vào col thì vẫn kích khoạt
    activationConstraint: {
      distance: 10
    }
  })

  // handle drag drop on mobile
  const touchSensor = useSensor(TouchSensor, {
    // phải ấn và gữ 250ms
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })

  const sensors = useSensors(
    mouseSensor,
    touchSensor
  )

  // handle drag with dnd-kit
  const handleDragColumn = (e) => {
    console.log(e)
    const { active, over } = e

    // nếu kéo xong vẫn ở vị trí cũ
    // dừng chương trình => tránh lỗi
    if (!over) return

    // nếu vị trí kéo khác với vị trí ban đầu
    if ( active.id !== over.id ) {
      // get the index after move
      const newIndex = orderredColumns.findIndex(c => c._id === over.id)
      // get the index before move
      const oldIndex = orderredColumns.findIndex(c => c._id === active.id)

      // arrange agian orderredCollums after move collums
      // arrayMove(Items, old, new)
      const dndOrderredColumns = arrayMove(orderredColumns, oldIndex, newIndex )
      setOrderredColumns(dndOrderredColumns)
      // console.log(orderredColumns)
    }
  }
  return (
    // Dnd Context wrapper to active event
    <DndContext sensors={sensors} onDragEnd={handleDragColumn} >
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
