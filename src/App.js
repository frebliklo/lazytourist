import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

import Context from './Context'

import { colors, gradients } from './theme'

import NotFound from './containers/NotFound'
import Sales from './containers/Sales'
import Tip from './containers/Tip'

import Nav from './components/Nav/Nav'
import Screen from './components/Screen'

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
    position: relative;
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

class App extends Component {
  constructor(props) {
    super(props)

    this.toggleNavOpacity = () => {
      this.setState(state => ({
        navOpacity: state.navOpacity === 0 ? 1 : 0,
      }))
    }

    this.state = {
      navOpacity: 1,
      toggleNavOpacity: this.toggleNavOpacity
    }
  }

  render() {
    return (
      <Router>
        <Screen>
          <Context.Provider value={this.state}>
            <Nav />
            <Switch>
              <Route 
                exact
                path="/"
                component={Tip}
              />
              <Route 
                exact
                path="/sales-tax"
                component={Sales}
              />
              <Route component={NotFound} />
            </Switch>
          </Context.Provider>
        </Screen>
      </Router>
    )
  }
}

export default App
