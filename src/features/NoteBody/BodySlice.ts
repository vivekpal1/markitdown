import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: '',
  creationtime: 0,
  name: ''

}
export const bodySlice = createSlice({
  name: 'body',
  initialState,
  reducers: {

  }
})

export default bodySlice.reducer
