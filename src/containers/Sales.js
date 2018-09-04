import React, { Component } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import { GET_LOCAL_STATE_SALES, SALES_TAX_FROM_LOCATION } from '../queries'

import Container, { 
  ContentContainer,
  ValuesContainer,
  AnimatedContentContainer
} from '../components/Container'
import InputForm from '../components/InputForm'
import LocationButton from '../components/LocationButton'
import SalesAmounts from '../components/SalesAmounts'
import ScreenTitle from '../components/ScreenTitle'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${props => props.direction ? props.direction : 'row'};
  justify-content: space-between;
  align-items: center;
`

const Tax = styled.h4`
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: .8rem;
`

const Text = styled.p`
  font-size: 1.2rem;
  text-align: center;
  opacity: .8;
  justify-self: flex-end;
`

class Sales extends Component {
  handleInputChange = (client, e) => {
    const amount = e.target.value

    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      client.writeData({
        data: { input: { value: amount, __typename: 'InputValue' } }
      })
    }
  }

  handleLocationError = err => {
    let message

    switch(err.code) {
      case err.PERMISSION_DENIED:
        message = 'Denied the request for Geolocation'
        break
      case err.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable'
        break
      case err.TIMEOUT:
        message = 'The request to get user location timed out'
        break
      case err.UNKNOWN_ERROR:
        message = 'An unknown error occurred'
        break
      default:
        message = 'Some error occurred'
        break
    }

    return <p>{message}</p>
  }

  getCurrentPosition = client => {
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
      console.log('Got position!',latitude,longitude)
      return null
    }, this.handleLocationError, { maximumAge: 3600000, timeout: 8000 })
  }

  fetchDeviceLocation = (location, client) => {
    if(location.lat || location.address) {
      return console.log('I should not get the location')
    }

    if(window.navigator.geolocation) {
      this.getCurrentPosition(client)
    }

    return null
  }

  renderValues = (inputValue, location) => {
    return (
      <Query query={SALES_TAX_FROM_LOCATION}>
        {({ loading, error, data }) => {
          if(loading) return <Text>Finding tax rate...</Text>
          if(error) return <Text>{error}</Text>
          
          const { formattedAddress, salesTax } = data.address
          const { average } = salesTax

          console.log(formattedAddress)
          
          return (
            <ValuesContainer>
              <AnimatedContentContainer justify="space-between">
                {inputValue ? <SalesAmounts inputValue={inputValue} salesTax={average} /> : <div />}
                <Wrapper direction="column">
                  <Tax>{`${(average*100)} % salex tax in ${data.address.state.longName}`}</Tax>
                  <Text>{formattedAddress}</Text>
                </Wrapper>
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
              <Wrapper>
                <ScreenTitle>Sales tax</ScreenTitle>
                {window.navigator.geolocation ? <LocationButton onClick={this.getCurrentPosition} /> : <div />}
              </Wrapper>
              {this.fetchDeviceLocation(location, client)}
              <ContentContainer>
                <InputForm 
                  inputValue={value}
                  onChange={e => this.handleInputChange(client, e)} 
                />
                {this.renderValues(value,location)}
              </ContentContainer>
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Sales
