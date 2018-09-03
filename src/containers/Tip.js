import React, { Component } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'

import Container from '../components/Container'
import InputForm from '../components/InputForm'
import RangeSlider from '../components/RangeSlider'
import ScreenTitle from '../components/ScreenTitle'

import { INPUT_VALUE } from '../queries'

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
`

class Tip extends Component {
  handleInputChange = (client, e) => {
    const amount = e.target.value
    console.log(amount)
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      client.writeData({
        data: { input: { value: amount, __typename: 'InputValue' } }
      })
    }
  }

  renderValues = () => {
    return (
      <ContentContainer>
        <RangeSlider />
      </ContentContainer>
    )
  }
  
  render() {
    return (
      <Query query={INPUT_VALUE}>
        {({ loading, error, data, client }) => {
          const { value } = data.input
          return (
            <Container margin="3.2rem auto">
              <ScreenTitle>Tip</ScreenTitle>
              <ContentContainer>
                <InputForm value={value} onChange={e => this.handleInputChange(client, e)} />
              </ContentContainer>
              {value ? this.renderValues() : null}
            </Container>
          )
        }}
      </Query>
    )
  }
}

export default Tip
