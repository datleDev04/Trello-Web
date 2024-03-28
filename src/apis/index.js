import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

//API BOARD

export const fetchBoarDetailAPI = async (boardID) => {
  const response = await axios.get(`${API_ROOT}/v1/board/${boardID}`)
  return response.data
}

export const updateBoarDetailAPI = async (boardID, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/board/${boardID}`, updateData)
  return response.data
}

export const moveCardToDiffAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/board/supports/moving_card`, updateData)
  return response.data
}

//API COLUMN
export const createNewColumnApi = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/column`, newColumnData)
  return response.data
}

export const updateColumnDetailAPI = async (columnID, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/column/${columnID}`, updateData)
  return response.data
}


//API CARD
export const createNewCardApi = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/card`, newCardData)
  return response.data
}
