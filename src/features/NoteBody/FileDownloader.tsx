import { ButtonProps, IconButton } from '@chakra-ui/react'
import { RefObject, useRef } from 'react'
import { FaFileDownload } from 'react-icons/fa'

export default function FileDownloader ({ props, content, name }: { props: ButtonProps, content: string, name: string}): JSX.Element {
  const ref = useRef() as RefObject<HTMLAnchorElement>

  const handleDownload = (): void => {
    const file = new Blob([content], { type: 'text/markdown' })
        ;(ref.current != null) && (ref.current.href = window.URL.createObjectURL(file))
    ref.current?.click()
  }

  return (
    <>
      <IconButton size='sm' aria-label='Download file' onClick={handleDownload} variant='outline' icon={<FaFileDownload />} my={props.my} mx={props.mx} />
      <a style={{ display: 'none' }} href='/' ref={ref} download={name + '.md'}>Hidden</a>
    </>
  )
}
