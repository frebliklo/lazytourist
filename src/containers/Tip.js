import React, { Component } from 'react'
import { Query } from 'react-apollo'

import { GET_LOCAL_STATE_TIP } from '../queries'

import Container, { 
  ContentContainer,
  AnimatedContentContainer,
  ValuesContainer 
} from '../components/Container'
import InputForm from '../components/InputForm'
import RangeSlider from '../components/RangeSlider'
import ScreenTitle from '../components/ScreenTitle'
import TipAmounts from '../components/TipAmounts'

class Tip extends Component {
  handleInputChange = (client, e) => {
    const amount = e.target.value

    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      client.writeData({
        data: { input: { value: amount, __typename: 'InputValue' } }
      })
    }
  }

  handleGratuityChange = (client, e) => {
    const value = e.target.value
    client.writeData({
      data: { gratuity: { percent: value, __typename: 'GratuityPercent' } }
    })
  }

  renderValues = (inputValue, gratuity, onChange, client) => {
    return (
      <ValuesContainer>
        <AnimatedContentContainer>
          <TipAmounts inputValue={inputValue} gratuity={gratuity} />
        </AnimatedContentContainer>
        <AnimatedContentContainer>
          <RangeSlider percent={gratuity} onChange={e => onChange(client, e)} />
        </AnimatedContentContainer>
      </ValuesContainer>
    )
  }
  
  render() {
    return (
      <Query query={GET_LOCAL_STATE_TIP}>
        {({ loading, error, data, client }) => {
          if(loading) return null
          if(error) return null

          const { value } = data.input
          const { percent } = data.gratuity

          return (
            <Container>
              <ScreenTitle>Tip</ScreenTitle>
              <ContentContainer>
                <InputForm value={value} onChange={e => this.handleInputChange(client, e)} />
                {value ? this.renderValues(value, percent, this.handleGratuityChange, client) : null}
              </ContentContainer>
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Tip
