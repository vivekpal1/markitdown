import { IconButton } from '@chakra-ui/react'
import { ChangeEventHandler, MouseEventHandler, MutableRefObject, useRef } from 'react'
import { FaUpload } from 'react-icons/fa'
const FileUploader = ({ handleFiles }: {handleFiles: (files: FileList) => void}): JSX.Element => {
  const hiddenFileInput = useRef() as MutableRefObject<HTMLInputElement>
  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    hiddenFileInput.current?.click()
  }
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files
    if (files != null) { handleFiles(files) }
  }
  return (
    <>
      <IconButton aria-label='Upload files' icon={<FaUpload />} variant='ghost' size='sm' colorScheme='orange' onClick={handleClick} />
      <input
        type='file'
        accept='.md'
        ref={hiddenFileInput}
        onChange={handleChange}
        multiple
        style={{ display: 'none' }}
      />
    </>
  )
}
export default FileUploader
