import validCVN from './cvn'
import validDate from './expired'
import validMatch from './matches'
import validNumber from './number'

// Builds out our nice readable object
const validation = ({ number, cvn, date }) => {
  const validationResults = [
    validNumber(number),
    validCVN(cvn),
    validDate(date),
    validMatch(cvn, number)
  ]
  let count = 0

  const results = validationResults.reduce((acc, r) => {
    const keys = Object.keys(r)
    const currKey = keys[keys.length - 1]

    if (!r.isValid) {
      count++
    }

    acc[currKey] = r[currKey]

    return acc
  }, {})

  results.isValid = count === 0

  return results
}

const simpleCard = card => {
  if (Object.prototype.toString.call(card) !== '[object Object]') {
    throw new TypeError('Must send full card object to run full validation')
  }

  return validation(card)
}
