import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: .8rem 0;
`

const Label = styled.h3`
  font-size: 1.6rem;
  font-weight: 400;
  text-align: left;
`

const AmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`

const PrimaryAmount = styled.h2`
  font-size: 2.4rem;
  font-weight: 400;
  text-align: right;
`

const SecondaryAmount = styled.p`
  font-size: 1.4rem;
  text-align: right;
  margin-right: .8rem;
  opacity: .8;
`

const formatAmount = (currency, amount) => {
  switch(currency) {
    case 'EUR':
      return `€ ${parseFloat(amount).toFixed(2)}`
    case 'GBP':
      return `£ ${parseFloat(amount).toFixed(2)}`
    case 'USD':
      return `$ ${parseFloat(amount).toFixed(2)}`
    default: 
      return `${parseFloat(amount).toFixed(2)} ${currency}`
  }
}

const Amount = ({ label, exchangeCurrency, exchangedAmount, currency, amount }) => (
  <Wrapper>
    <Label>{label}</Label>
    <AmountWrapper>
      {exchangeCurrency ? <SecondaryAmount>{formatAmount(exchangeCurrency,exchangedAmount)}</SecondaryAmount> : null}
      <PrimaryAmount>{formatAmount(currency,amount)}</PrimaryAmount>
    </AmountWrapper>
  </Wrapper>
)

export default Amount
