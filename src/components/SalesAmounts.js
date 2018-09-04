import React from 'react'
import { Query } from 'react-apollo'

import { USD_TO_DKK } from '../queries'

import Amount from './Amount'
import AmountSeperator from './AmountSeperator';

const SalesAmounts = ({ inputValue, salesTax }) => (
  <Query query={USD_TO_DKK}>
    {({ loading, error, data }) => {
      if (loading) return null
      if (error) return `Error!: ${error}`

      const { source, exchangeRate } = data.currency
      const { currency, rate } = exchangeRate

      const taxAmount = inputValue*parseFloat(salesTax)
      const totalAmount = parseFloat(inputValue)+parseFloat(taxAmount)

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
            label="Tax"
            exchangeCurrency={currency}
            exchangedAmount={taxAmount*rate}
            currency={source}
            amount={taxAmount}
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

export default SalesAmounts
