import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import 'normalize.css/normalize.css'

import { GRAPHQL_ENDPOINT } from './config'

import App from './App'

import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT
})

const WrappedApp = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

ReactDOM.render(<WrappedApp />, document.getElementById('root'))
registerServiceWorker()
