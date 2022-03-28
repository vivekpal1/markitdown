import { combineReducers, configureStore } from '@reduxjs/toolkit'
import BodySlice from '../features/NoteBody/BodySlice'
import SidebarSlice from '../features/Sidebar/SidebarSlice'

const rootReducer = combineReducers({
  sidebar: SidebarSlice,
  body: BodySlice
})

export default configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
