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
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formator'

// cloneDeep


export default function BoardContent( { board, createNewColumn, createNewCard } ) {
  const ACTIVE_ITEM_TYPE = {
    COLUMN : 'ACTIVE_ITEM_COLUMN',
    CARD : 'ACTIVE_ITEM_CARD'
  }

  const [orderredColumns, setOrderredColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDragCard, setOldColumnWhenDragCard] = useState(null)

  useEffect(() => {
    setOrderredColumns(mapOrder(board.columns, board.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardID) => {
    return orderredColumns.find(column => column?.cards.map(card => card._id).includes(cardID))
  }

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

  // cap nhat state khi keo tha sang cac col khac nhau
  const moveCardBetweenDiffCol = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDragingCardId,
    activeDragingCardData
  ) => {
    setOrderredColumns(prevColumns => {
      // tìm vị trí (index) mà card sắp được thả
      const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)
      // console.log(overCardIndex ,"sahduksahdsaas");

      // logic tính toán index mới của card sau khi được drop sang cột mới
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // clone lại mảng state orderredCollum ra 1 mảng mới rồi handle rồi return lại state mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id == activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id == overColumn._id)

      if (nextActiveColumn) {
        // xử lí mảng cards sau khi đã được kéo => loại bỏ card được kéo
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragingCardId)

        // thêm 1 card ẩn nếu card trong col được kéo đi hết
        // => fix bug col trống không thể kéo thả
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards.push(generatePlaceholderCard(nextActiveColumn))
        }

        // cập nhật lại cardOrderIds sau khi đã được kéo card sang cột khác
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        // kiểm tra ở overColumn xem đã có card đó chưa, nếu có thì xóa nó đi
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragingCardId)

        const rebuild_activeDrangingCardData = {
          ...activeDragingCardData,
          columnId: nextOverColumn._id
        }

        // thêm card vào overColumn
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDrangingCardData)

        // xóa placeholderCard nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_placholder_card)

        // cập nhật lại cardOrderIds sau khi đã được kéo card vào cột mình
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      return nextColumns
    })
  }

  // handle dragstart
  const handleDragStartColumn = (event) => {
    // console.log(event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_ITEM_TYPE.CARD : ACTIVE_ITEM_TYPE.COLUMN )
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDragCard(findColumnByCardId(event?.active?.id))
    }
  }

  //handlde dragover
  const handleDragOver = (event) => {
    // console.log(event);

    // nếu là kéo thả cột thì return vì kéo thả cột đã ổn
    // dragover để xử lí kéo card từ cột này sang cột khác
    if (activeDragItemType === ACTIVE_ITEM_TYPE.COLUMN) return

    // nếu là kéo thả card thì mới xử lí
    if (activeDragItemType === ACTIVE_ITEM_TYPE.CARD) {
      // lấy active và over từ event
      const { active, over } = event

      // nếu không có over hoặc active thì return
      if (!over || !active) return

      // lấy id và data của item khi active
      const { id: activeDragingCardId, data: { current: activeDragingCardData } } = active
      // lấy id của item khi over
      const { id: overCardId } = over


      // lấy ra cột ban đầu được active
      const activeColumn = findColumnByCardId(activeDragingCardId)

      // lấy ra cột over
      const overColumn = findColumnByCardId(overCardId)
      // console.log("active ",activeColumn)
      // console.log("overColumn", overColumn)

      if (!activeColumn || !overColumn) return

      // chỉ xử lí nếu kéo card sang 1 cột #
      // dragEnd đã xử lí nếu kéo card tỏng 1 column
      if (activeColumn !== overColumn) {
        moveCardBetweenDiffCol(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragingCardId,
          activeDragingCardData
        )
      }

    }
  }

  // handle dragend with dnd-kit
  const handleDragEndColumn = (event) => {
    const { active, over } = event

    // nếu kéo xong vẫn ở vị trí cũ
    // dừng chương trình => tránh lỗi
    if (!over) return

    // console.log(event)
    if (activeDragItemType === ACTIVE_ITEM_TYPE.CARD) {
      // console.log('Handle Drag end: Hnahf động kéo card đang không làm gì cả : ')
      // lấy id và data của item khi active
      const { id: activeDragingCardId, data: { current: activeDragingCardData } } = active
      // lấy id của item khi over
      const { id: overCardId } = over


      // lấy ra cột ban đầu được active
      const activeColumn = findColumnByCardId(activeDragingCardId)

      // lấy ra cột over
      const overColumn = findColumnByCardId(overCardId)

      if (oldColumnWhenDragCard._id !== overColumn._id) {
        moveCardBetweenDiffCol(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragingCardId,
          activeDragingCardData
        )
      } else {
        // Xử lí khi kéo card chung 1 Column

        // lấy vị trí mới của card trong Cột
        const newCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)

        // lấy vị trí cũ của card trong Cột
        const oldCardIndex = oldColumnWhenDragCard?.cards.findIndex(card => card._id === activeDragItemId)

        // console.log('Old index', oldIndex);
        // console.log('New index', newIndex);
        // console.log('data', activeDragingCardData);


        const dndOrderredCard = arrayMove(oldColumnWhenDragCard?.cards, oldCardIndex, newCardIndex)

        setOrderredColumns(prevColumns => {
          // clone lại mảng state orderredCollum ra 1 mảng mới rồi handle rồi return lại state mới
          const nextColumns = cloneDeep(prevColumns)

          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // cập nhật lại giá trị cho targetColumn
          targetColumn.cards = dndOrderredCard
          targetColumn.cardOrderIds = dndOrderredCard.map(card => card._id)

          // trả về nextColums với dữ liệu đã được cập nhật
          return nextColumns
        })

      }
    }

    // xử lí kéo thả column
    if (activeDragItemType === ACTIVE_ITEM_TYPE.COLUMN) {
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


    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setOldColumnWhenDragCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    // Dnd Context wrapper to active event
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStartColumn}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEndColumn}
    >
      {/* FULL BOARD CONTENT */}
      <Box sx={{
        width : '100%',
        height : (theme) => theme.trello.boardContentHeight,
        bgcolor: (theme) => ( theme.palette.mode === 'dark' ? '#2c3e50' : '#1976d2' )
      }} >

        <ListColumns
          columns ={orderredColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
        <DragOverlay dropAnimation={customDropAnimation} >
          {!activeDragItemId && null }
          {(activeDragItemType === ACTIVE_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}
