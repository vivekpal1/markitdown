import { Flex, Heading, Spacer } from '@chakra-ui/react'

export default function SPane (): JSX.Element {
  return (
    <Flex h='100vh' flexGrow='1' bg='yellow'>
      <Spacer />
      <Heading>Settings</Heading>
      <Spacer />
    </Flex>
  )
}
