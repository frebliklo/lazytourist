import { gql } from 'apollo-boost'

const INPUT_VALUE = gql`
  query inputValue {
    input @client {
      value
    }
  }
`

export default INPUT_VALUE
