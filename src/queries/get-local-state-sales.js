import { gql } from 'apollo-boost'

const GET_LOCAL_STATE_SALES = gql`
  query getLocalStateTip {
    input @client {
      value
    }
    location @client {
      lat
      lng
      address
    }
  }
`

export default GET_LOCAL_STATE_SALES
