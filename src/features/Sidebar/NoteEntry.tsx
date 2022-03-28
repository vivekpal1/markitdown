import {
  AlertDialog, AlertDialogBody, AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  HStack,
  IconButton,
  Input,
  ScaleFade,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { FormEventHandler, MouseEventHandler, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import { deleteNote, renameNote } from './SidebarSlice'

export default function NoteEntry ({ noteName }: {noteName: string}): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isRenameAlertOpen, setRenameAlertIsOpen] = useState<boolean>(false)
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState<boolean>(false)
  const currentNoteName = useSelector((state: RootState) => state.sidebar.currentNote.name)
  const current = currentNoteName === noteName
  const [newName, setNewName] = useState<string>(noteName)
  const [newNameValid, setNewNameValid] = useState<boolean>(true)
  const noteNames = useSelector((state: RootState) => state.sidebar.notes.map(note => note.name))
  const bgColor = useColorModeValue(current ? 'orange.300' : 'orange.100', current ? 'orange.700' : 'orange.900')
  const handleRename: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (noteNames.some(name => name === newName)) {
      setNewNameValid(false)
    } else if (current) {
      setRenameAlertIsOpen(false)
      dispatch(renameNote({ oldName: noteName, newName }))
      navigate(`/note/${newName}`)
    } else {
      setRenameAlertIsOpen(false)
      dispatch(renameNote({ oldName: noteName, newName }))
    }
  }
  const handleDelete: MouseEventHandler = (e) => {
    if (current) {
      dispatch(deleteNote({ name: noteName }))
      navigate('/')
    } else {
      dispatch(deleteNote({ name: noteName }))
    }
    setDeleteAlertOpen(false)
  }
  return (
    <ScaleFade in initialScale={0.8}>
      <Link to={`/note/${noteName}`}>
        <AlertDialog motionPreset='scale' isOpen={isRenameAlertOpen} onClose={() => setRenameAlertIsOpen(false)} leastDestructiveRef={undefined}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <form onSubmit={handleRename}>
              <AlertDialogHeader>
                Rename note
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <FormControl isInvalid={!newNameValid}>
                  <Input
                    autoFocus isRequired pattern='[A-Za-z0-9_ ]+' name='name' type='text' value={newName} onChange={(e) => {
                      setNewName(e.target.value)
                      setNewNameValid(true)
                    }}
                  />
                  <FormHelperText>
                    Use a unique,alphanumeric name
                  </FormHelperText>
                </FormControl>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button type='submit'>Rename</Button>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
        <Flex
          cursor='pointer' bg={bgColor} rounded='full' m='1' p='2' shadow='sm' _hover={{
            boxShadow: 'lg'
          }} justify='space-between'
        >
          <Text px='2' maxW='50%' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>{noteName}</Text>
          <HStack alignSelf='flex-end'>
            <IconButton
              colorScheme='orange' size='xs' aria-label='Rename note' rounded='full' variant='outline' icon={<FaPen />} onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setRenameAlertIsOpen(true)
              }}
            />
            <AlertDialog autoFocus motionPreset='scale' isOpen={isDeleteAlertOpen} onClose={() => setDeleteAlertOpen(false)} leastDestructiveRef={undefined}>
              <AlertDialogOverlay />
              <AlertDialogContent>
                <AlertDialogHeader>
                  Delete note?!
                </AlertDialogHeader>
                <AlertDialogBody>
                  Are you sure, you want to delete this note?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <AlertDialogCloseButton />
                  <Button variant='solid' colorScheme='red' onClick={handleDelete}>Delete</Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <IconButton
              colorScheme='orange' size='xs' aria-label='Delete note' rounded='full' onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDeleteAlertOpen(true)
              }} variant='outline' icon={<FaTrash />}
            />
          </HStack>
        </Flex>
      </Link>
    </ScaleFade>
  )
}
