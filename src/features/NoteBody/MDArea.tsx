import { Flex, Textarea, useColorModeValue, useToast } from '@chakra-ui/react'
import { ChangeEventHandler, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { addNote, editNote, saveNote } from '../Sidebar/SidebarSlice'

export default function MDArea ({ noteId }: {noteId: string}): JSX.Element {
  const currentNote = useSelector((state: RootState) => state.sidebar.currentNote)
  const toast = useToast()
  const savedNoteContent = useSelector((state: RootState) => {
    return state.sidebar.notes.find(note => note.name === noteId)?.content
  })
  const dispatch = useDispatch()
  const bgColor = useColorModeValue('red.50', 'orange.700')
  const noteNames = useSelector((state: RootState) => state.sidebar.notes.map(note => note.name))
  const handleSave = (): void => {
    const existingNote = (noteNames.some((name) => name === noteId))
    if (currentNote.name === noteId && existingNote) { dispatch(saveNote({ content: currentNote.content, id: noteId })) } else if (!existingNote) {
      dispatch(addNote({ content: currentNote.content, name: noteId }))
    }
    toast({
      variant: 'solid',
      status: 'success',
      description: 'Note saved',
      duration: 200,
      position: 'top-right'
    })
  }
  // create a new note here and add to current note
  // update notes array only on save
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    dispatch(editNote({ id: noteId, content: e.target.value }))
  }
  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault()
      event.stopPropagation()
      handleSave()
    }
  }
  useEffect(() => {
    const clearCurrent = (): void => {
      dispatch(editNote({ id: '', content: '' }))
    }
    return clearCurrent
  }, [dispatch, noteId])
  useEffect(() => {
    dispatch(editNote({ id: noteId, content: savedNoteContent }))
  }, [savedNoteContent, noteId, dispatch])
  return (
    <Flex
      overflowY='auto' overflowWrap='break-word'
      bg={bgColor} minW={{
        md: '48%'
      }} flexDir='column' rounded='lg' flexGrow='5' p='4'
      minH={{
        base: '45vh',
        md: 'full'
      }}
    >
      <Textarea autoFocus fontSize='sm' minH='full' size='lg' display='flex' flexGrow='1' resize='none' maxW='full' variant='unstyled' placeholder='Write markdown here!' value={(currentNote.content)} onKeyDown={handleKeyDown} onChange={handleChange} fontWeight='medium' fontFamily='mono' />
    </Flex>
  )
}
