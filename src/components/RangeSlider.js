import React from 'react'
import styled from 'styled-components'

import { colors, shadows } from '../theme'

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
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: ${colors.blue['000']};
  outline: none;
  margin: 1.6rem 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    background: ${colors.white}
    cursor: pointer;
    transition: background 170ms ease-in-out;

    & :hover {
      background: ${colors.yellow['200']};
    }
  }

  &:active::-webkit-slider-thumb {
    background: ${colors.yellow['200']};
  }

  &::-moz-range-thumb {
    width: 1.6rem;
    height: 1.6rem;
    border: 0;
    border-radius: 50%;
    background: ${colors.white}
    cursor: pointer;
    transition: background 170ms ease-in-out;

    & :hover {
      background: ${colors.yellow['200']};
    }
  }

  &:active::-moz-range-thumb {
    background: ${colors.yellow['200']};
  }

  &:focus {

    &::-webkit-slider-thumb {
      box-shadow: ${shadows.default};
    }

  }
`

const ValueTxt = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
`

const RangeSlider = ({ percent, onChange }) => (
  <Wrapper>
    <Desc>Ajust tip percentage</Desc>
    <Slider
      type="range"
      value={percent}
      min="0"
      max="1"
      step="0.01"
      onChange={onChange}
    />
    <ValueTxt>{Math.floor(percent*100)} % tip</ValueTxt>
  </Wrapper>
)

export default RangeSlider
