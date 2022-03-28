import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react'

export default function Empty (): JSX.Element {
  const isMobile = useBreakpointValue({ md: false }) ?? true
  return (
    !isMobile
      ? <Flex flexGrow='1' align='center' justify='center'>
        <Heading>Such empty :/</Heading>
      </Flex>
      : <></>
  )
}
