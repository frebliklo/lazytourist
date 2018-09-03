import { gql } from 'apollo-boost'

const USD_ALL_RATES = gql`
  query usdAllSoruces{
    currency(source:"usd") {
      source
      name
      rates {
        name
        currency
        rate
      }
    }
  }
`

export default USD_ALL_RATES
