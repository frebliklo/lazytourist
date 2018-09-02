import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

import { ApolloProvider, Query } from 'react-apollo'

import 'normalize.css/normalize.css'

// import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { GRAPHQL_ENDPOINT } from './config'

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT
})

const ExchangeRate = () => (
  <Query
    query={gql`
      {
        currency(source:"usd") {
          name
          rate(currency:"dkk") {
            name
            rate
          }
        }
      }
    `}>
      {({ loading, error, data }) => {
        if(loading) return <p>Loading...</p>
        if(error) return <p>Error...</p>

        const { currency } = data
        console.log(currency)
        return (
          <div>
            <h3>{currency.name}</h3>
            <h4>Rates</h4>
            <p>{currency.rate.name}: {currency.rate.rate.toFixed(2)}</p>
          </div>
        )
      }}
    </Query>
)

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>Hello world, this is Apollo</h2>
      <ExchangeRate />
    </div>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
