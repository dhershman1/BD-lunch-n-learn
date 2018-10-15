const math = require('../index')
require('chai').should() // ?????

// Where does describe come from????
describe('It does the maths', function () {
  let run = {}

  // Where does before come from????
  before(function () {
    run = math()
  })

  // Where does it come from????
  it('should do an add', function () {
    // Why does it just add stuff to my functions????
    run.add(1, 2).should.equal(3)
  })

  it('should do a subtract', function () {
    run.subtract(2, 1).should.equal(1)
  })

  it('should do a multiply', function () {
    run.multiply(2, 2).should.equal(4)
  })

  it('should do a divide', function () {
    run.divide(4, 2).should.equal(2)
  })
})
