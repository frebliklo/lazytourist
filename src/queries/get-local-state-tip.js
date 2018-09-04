import { gql } from 'apollo-boost'

const GET_LOCAL_STATE_TIP = gql`
  query getLocalStateTip {
    input @client {
      value
    }
    gratuity @client {
      percent
    }
}
`

export default GET_LOCAL_STATE_TIP
