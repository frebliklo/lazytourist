import { gql } from 'apollo-boost'

const SALES_TAX_FROM_LOCATION = gql`
  query salesTaxFromLocation {
    address(lat:"40.714224",lng:"-73.961452") {
      formattedAddress
      state {
        longName
      }
      salesTax {
        average
      }
    }
  }
`

export default SALES_TAX_FROM_LOCATION
