import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { GET_LOCAL_STATE_SALES, SALES_TAX_FROM_LOCATION } from '../queries'

import Container, { 
  ContentContainer,
  ValuesContainer,
  AnimatedContentContainer
} from '../components/Container'
import InputForm from '../components/InputForm'
import SalesAmounts from '../components/SalesAmounts'
import ScreenTitle from '../components/ScreenTitle'

class Sales extends Component {
  handleInputChange = (client, e) => {
    const amount = e.target.value

    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      client.writeData({
        data: { input: { value: amount, __typename: 'InputValue' } }
      })
    }
  }

  fetchDeviceLocation = (location, client) => {
    if(location.lat || location.address) {
      return console.log('I should not get the location')
    }

    if(window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = await position.coords
        
        client.writeData({
          data: {
            location: {
              lat: latitude,
              lng: longitude,
              __typename: 'Location' 
            }
          }
        })

        return null
      })
    }

    return null
  }

  renderValues = (inputValue, location) => {
    if(!inputValue) return null
    return (
      <Query query={SALES_TAX_FROM_LOCATION}>
        {({ loading, error, data }) => {
          if(loading) return <p style={{ textAlign: 'cetner', margin: '0 auto' }}>Finding tax rate...</p>
          if(error) return null

          const { average } = data.address.salesTax

          return (
            <ValuesContainer>
              <AnimatedContentContainer>
                <SalesAmounts inputValue={inputValue} salesTax={average} />
              </AnimatedContentContainer>
            </ValuesContainer>
          )
        }}
      </Query>
    )
  }
  
  render() {
    return (
      <Query query={GET_LOCAL_STATE_SALES}>
        {({ loading, error, data, client }) => {
          if(loading) return null
          if(error) return null

          const { value } = data.input
          const { location } = data

          return (
            <Container>
              <ScreenTitle>Sales tax</ScreenTitle>
              {this.fetchDeviceLocation(location, client)}
              <ContentContainer>
                <InputForm value={value} onChange={e => this.handleInputChange(client, e)} />
                {location.lat || location.address ? this.renderValues(value,location) : null}
              </ContentContainer>
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Sales
