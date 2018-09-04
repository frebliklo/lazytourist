import React, { Component } from 'react'
import styled from 'styled-components'

import Context from '../Context'

import { colors, shadows } from '../theme'

const Input = styled.input`
  flex: 1;
  font-size: 2.4rem;
  text-align: center;
  background: ${colors.white};
  color: ${colors.black};
  border: none;
  border-radius: 8px;
  box-shadow: ${shadows.default};
  padding: 1.6rem 0;
  max-width: 100%;
  outline: none;
`

const Form = styled.form`
  display: flex;
  width: 100%;
`

class InputForm extends Component {
  onSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { inputValue, onChange } = this.props

    return (
      <Context.Consumer>
        {value => (
          <Form onSubmit={this.onSubmit} >
            <Input
              type="number"
              placeholder="Input amount"
              value={inputValue}
              onChange={onChange}
              onFocus={value.toggleNavOpacity} 
              onBlur={value.toggleNavOpacity}
            />
          </Form>
        )}
      </Context.Consumer>
    )
  }
}

export default InputForm
