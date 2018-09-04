import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import 'normalize.css/normalize.css'

import { GRAPHQL_ENDPOINT } from './config'

import App from './App'

import registerServiceWorker from './registerServiceWorker'

const defaults = {
  input: {
    value: '',
    __typename: 'InputValue'
  },
  gratuity: {
    percent: .18,
    __typename: 'GratuityPercent'
  },
  location: {
    lat: '',
    lng: '',
    address: '',
    __typename: 'Location'
  }
}

const resolvers = {
  Mutation: {
    updateInput: (_, params, { cache }) => {
      const data = {
        input: {
          value: '',
          __typename: 'InputValue'
        }
      }

      cache.writeData(({ data }))
      return null
    }
  }
}

const typeDefs = `
  type Input {
    value: Float!
  }

  type Gratuity {
    percent: Float!
  }

  type Location {
    lat: String!
    lng: String!
    address: String!
  }

  type Query {
    input: Input
    gratuity: Gratuity
    location: Location
  }
`

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
})

const WrappedApp = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

ReactDOM.render(<WrappedApp />, document.getElementById('root'))
registerServiceWorker()
