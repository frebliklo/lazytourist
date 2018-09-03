import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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

class Tip extends Component {
  state = {
    gratuity: .18,
    secondaryCurrency: {
      currency: 'DKK',
      rate: 6.4
    }
  }
  
  render() {
    return (
      <div>
        <h1>Tip</h1>
        <Query query={USD_ALL_RATES}>
          {({ loading, error, data }) => {
            if(loading) return <p>Getting latest exchange rate</p>
            if(error) return <p>Couldn't find lates rate</p>

            const { currency } = data
            console.log(currency)
            return (
              <div>
                <h5>Got data!</h5>
                <p>{currency.name}</p>
                {currency.rates.map(exchange => (
                  <div key={exchange.currency}>
                    <h6>{exchange.name}</h6>
                    <p>{exchange.rate}</p>
                  </div>
                ))}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Tip
