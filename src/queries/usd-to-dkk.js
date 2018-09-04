import { gql } from 'apollo-boost'

const USD_TO_DKK = gql`
  query usdToDkk{
    currency(source:"usd") {
      source
      exchangeRate {
        currency
        rate
      }
    }
  }
`

export default USD_TO_DKK
