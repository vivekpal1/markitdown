import { ChakraProps, Flex, IconButton, useBreakpointValue, useColorModeValue, useToast } from '@chakra-ui/react'
import { FaChevronLeft, FaSave } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import { addNote, saveNote } from '../Sidebar/SidebarSlice'
import FileDownloader from './FileDownloader'

export default function Navbar ({ noteId }: {noteId: string}): JSX.Element {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const currentNote = useSelector((state: RootState) => state.sidebar.currentNote)
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

  const mq = useBreakpointValue({ base: { flexDirection: 'row', my: '0', mx: '2', p: '0' }, md: { flexDirection: 'column', my: '2', mx: '0', p: '1' } }) as ChakraProps
  return (
    <Flex
      bg={bgColor} rounded='lg' p={mq.p} flexDir={mq?.flexDirection} flexGrow='2' align='center'
    >
      <IconButton size='sm' aria-label='Go back' onClick={() => navigate('/')} variant='outline' icon={<FaChevronLeft />} my={mq.my} mx={mq.mx} />
      <FileDownloader content={currentNote.content} name={noteId} props={{ mx: mq.mx, my: mq.my }} />
      <IconButton size='sm' aria-label='Save note' onClick={handleSave} variant='solid' colorScheme='green' icon={<FaSave />} my={mq.my} mx={mq.mx} />
    </Flex>
  )
}
