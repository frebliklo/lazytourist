import React, { Component } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import { GRATUITY_PERCENT } from '../queries'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
`

const Desc = styled.p`
  font-size: 1.2rem;
  text-transform: uppercase;
`

const Slider = styled.input`
  width: 100%;
`

const ValueTxt = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
`

class RangeSlider extends Component {
  onChange = (client, e) => {
    const value = e.target.value
    client.writeData({
      data: { gratuity: { percent: value, __typename: 'GratuityPercent' } }
    })
  }
  
  render() {
    return (
      <Wrapper>
        <Desc>Ajust tip percentage</Desc>
        <Query query={GRATUITY_PERCENT}>
          {({ loading, error, data, client }) => {
            const { percent } = data.gratuity
            const prettyPercent = Math.floor(percent*100)
            return (
              <div>
                <Slider
                  type="range"
                  value={percent}
                  min="0"
                  max="1"
                  step="0.01"
                  onChange={e => this.onChange(client, e)}
                />
                <ValueTxt>{prettyPercent} % tip</ValueTxt>
              </div>
            )
          }}
        </Query>
      </Wrapper>
    )
  }
}

export default RangeSlider
