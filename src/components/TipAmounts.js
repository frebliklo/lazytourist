import React from 'react'
import { Query } from 'react-apollo'

import { USD_TO_DKK } from '../queries'

import Amount from './Amount'
import AmountSeperator from './AmountSeperator'

const TipAmounts = ({ inputValue, gratuity = .18 }) => (
  <Query query={USD_TO_DKK}>
    {({loading, error, data}) => {
      if (loading) return null
      if (error) return `Error!: ${error}`
      
      const { source, exchangeRate } = data.currency
      const { currency, rate } = exchangeRate

      const tipAmount = inputValue*gratuity
      const totalAmount = parseFloat(inputValue)+parseFloat(tipAmount)

      const items = [
        { label: 'Amount', exchangedAmount: (inputValue*rate), amount: inputValue },
        { label: 'Tip', exchangedAmount: (tipAmount*rate), amount: tipAmount },
        { label: 'Total', exchangedAmount: (totalAmount*rate), amount: totalAmount },
      ]
      return (
        <div>
          <Amount
            label="Amount"
            exchangeCurrency={currency}
            exchangedAmount={inputValue*rate}
            currency={source}
            amount={inputValue}
          />
          <Amount
            label="Tip"
            exchangeCurrency={currency}
            exchangedAmount={tipAmount*rate}
            currency={source}
            amount={tipAmount}
          />
          <AmountSeperator />
          <Amount
            label="Total"
            exchangeCurrency={currency}
            exchangedAmount={totalAmount*rate}
            currency={source}
            amount={totalAmount}
          />
        </div>
      )
    }}
  </Query>
)

export default TipAmounts
