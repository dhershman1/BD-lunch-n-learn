import assign from 'kyanite/assign'
import every from 'kyanite/every'
import type from 'kyanite/type'

import validCVN from './cvn'
import validDate from './expired'
import validMatch from './matches'
import validNumber from './number'

const simpleCard = card => {
  if (type(card) !== 'Object') {
    throw new TypeError('Must send full card object to run full validation')
  }

  const validationResults = [
    validNumber(card.number),
    validCVN(card.cvn),
    validDate(card.date),
    validMatch(card.cvn, card.number)
  ]

  return assign(...validationResults, { isValid: every(x => x.isValid, validationResults) })
}
