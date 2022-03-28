import { ChakraProps, Flex, useBreakpointValue, useColorModeValue } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import MDArea from './MDArea'
import Navbar from './Navbar'
import NoteBody from './NoteBody'

export default function Body (): JSX.Element {
  const mq = useBreakpointValue({ md: { zIndex: 0, position: 'static', flexDirection: 'row', minH: 'full' }, base: { zIndex: 3, position: 'absolute', flexDirection: 'column', minH: '98vh' } }) as ChakraProps
  const bgColor = useColorModeValue('white', 'gray.600')
  const { noteId } = useParams()
  return (
    <Flex
      minH={mq.minH} minW={{
        md: '70%'
      }}
      w={
        {
          base: '96%'
        }
      }
      bg={bgColor} zIndex={mq.zIndex} position={mq.position} flexDirection={mq.flexDirection} flexGrow='7'
    >
      <NoteBody noteId={noteId ?? ''} />
      <MDArea noteId={noteId ?? ''} />
      <Navbar noteId={noteId ?? ''} />
    </Flex>
  )
}
