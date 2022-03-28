import { createSlice } from '@reduxjs/toolkit'
import { Note } from '../../types'

const initialState: {notes: Note[], currentNote: Note, searchNotes: Note[]} = {
  notes: [],
  currentNote: {
    name: '',
    content: '',
    creationtime: 0
  },
  searchNotes: []
}
export function saveState (notes: Note[]): void {
  window.localStorage.setItem('notes', JSON.stringify(notes))
}
export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote: Note = {
        name: action.payload.name,
        content: action.payload.content,
        creationtime: Date.now()
      }
      state.notes.push(newNote)
      saveState(state.notes)
    },
    saveNote: (state, action) => {
      state.notes.forEach((note, indx) => {
        if (note.name === action.payload.id) {
          note.content = action.payload.content
        }
      })
      saveState(state.notes)
    },
    editNote: (state, action) => {
      state.currentNote.name = action.payload.id
      state.currentNote.content = action.payload.content
    },
    renameNote: (state, action) => {
      state.notes.forEach((note, indx) => {
        if (note.name === action.payload.oldName) {
          note.name = action.payload.newName
        }
      })
      saveState(state.notes)
    },
    loadNotes: (state, action) => {
      state.notes = action.payload
      saveState(state.notes)
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.name !== action.payload.name)
      saveState(state.notes)
    },
    setSearchNotes: (state, action) => {
      state.searchNotes = action.payload
    }
  }
})
export const { addNote, saveNote, editNote, renameNote, loadNotes, deleteNote, setSearchNotes } = sidebarSlice.actions
export default sidebarSlice.reducer
