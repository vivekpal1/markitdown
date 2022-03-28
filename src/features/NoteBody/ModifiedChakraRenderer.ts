import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { Components } from 'react-markdown'

export default function ModifiedChakraRenderer (): Components {
  return {
    ...ChakraUIRenderer(),
    input: 'span'
  }
}
