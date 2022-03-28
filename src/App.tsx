import {
  ChakraProvider,
  Flex
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Body from './features/NoteBody/Body'
import Empty from './features/NoteBody/Empty'
import SPane from './features/Settings/SPane'
import Sidebar from './features/Sidebar/Sidebar'
import { loadNotes } from './features/Sidebar/SidebarSlice'
import theme from './theme'
import { Note } from './types'

export const App = (): JSX.Element => {
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      const storedNotes: Note[] = JSON.parse(window.localStorage.getItem('notes') ?? '[{"name":"Welcome","content":"Welcome to Mark It Down, an application to take mark down notes.__\\n\\nIt\'s a simple app used to quickly take down notes, todo lists or anything text for that matter. or even images :)","creationtime":0}]')
      dispatch(loadNotes(storedNotes))
    } catch (e) {
      console.error(e)
    }
  }, [dispatch])

  return (
    <ChakraProvider theme={theme}>
      <Flex minH='100vh' maxH='100vh' minW='100vw' maxW='100vw' p='2'>
        <Routes>
          <Route path='/' element={<><Sidebar /><Empty /></>} />
          <Route path='/note/:noteId' element={<><Sidebar /><Body /></>} />
          <Route path='/settings' element={<SPane />} />
        </Routes>
      </Flex>
    </ChakraProvider>
  )
}
