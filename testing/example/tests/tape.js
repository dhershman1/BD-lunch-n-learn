const math = require('../index')
const test = require('tape')
const { add, subtract, multiply, divide } = math()

test('Does the maths', t => {
  t.is(add(1, 2), 3, 'Does an add and gets 3')
  t.is(subtract(2, 1), 1, 'Does a subtract and gets 1')
  t.is(multiply(2, 2), 4, 'Does a multiply and gets 4')
  t.is(divide(4, 2), 2, 'Does a divide and gets 2')
  t.end()
})
