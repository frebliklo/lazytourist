import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { injectGlobal } from 'styled-components'

import { GRAPHQL_ENDPOINT } from './config'
import { colors, gradients } from './theme'

import NotFound from './containers/NotFound'
import Tip from './containers/Tip'

injectGlobal`
  @font-face {
    font-family: 'Inter UI';
    font-style: normal;
    font-weight: 400;
    src: local('Inter UI'), url('%PUBLIC_URL%/static/fonts/Inter-UI-Regular.woff') format('woff'), url('%PUBLIC_URL%/static/fonts/Inter-UI-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter UI';
    font-style: normal;
    font-weight: 700;
    src: local('Inter UI Bold'), url('%PUBLIC_URL%/static/fonts/Inter-UI-Bold.woff') format('woff'), url('%PUBLIC_URL%/static/fonts/Inter-UI-Bold.woff2') format('woff2');
  }

  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;    
  }

  body {
    box-sizing: border-box;
    background: ${gradients.brand};
    color: ${colors.white};
    min-height: 100vh;
    font-family: 'Inter UI', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
  }

  h1 {
    font-weight: 700;
  }

  h1,h2,h3,h4,h5,h6,p,a,li {
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          {/* HERE GOES THE NAVIGATION! */}
          <Switch>
            <Route exact path="/" component={Tip} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
