import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { Query } from 'react-apollo'

import { GET_LOCAL_STATE_TIP } from '../queries'

import Container from '../components/Container'
import InputForm from '../components/InputForm'
import RangeSlider from '../components/RangeSlider'
import ScreenTitle from '../components/ScreenTitle'
import TipAmounts from '../components/TipAmounts'

const enterAnimation = keyframes`
  0% {
    scale: 0;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
`

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  transition: all 200ms ease-out;
  margin: 3.2rem 0;
`

const AnimatedContentContainer = styled(ContentContainer)`
  animation: ${enterAnimation} 300ms ease-out;
`

const ValuesContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

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
