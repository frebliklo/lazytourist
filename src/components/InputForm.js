import React, { Component } from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import { INPUT_VALUE } from '../queries'

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
    const { value, onChange } = this.props

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          type="number"
          placeholder="Input amount"
          value={value}
          onChange={onChange}
        />
      </Form>
    )
  }
}

export default InputForm
