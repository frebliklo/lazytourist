import { gql } from 'apollo-boost'

const GRATUITY_PERCENT = gql`
  query gratuityPercent {
    gratuity @client {
      percent
    }
  }
`

export default GRATUITY_PERCENT
