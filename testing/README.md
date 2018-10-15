# Testing

Testing is a powerful and efficient way of testing an application, we all know this.

Though there are tons and tons of suites out there, and articles that tell what you should be using and when/why! But honestly, should you?

I am hoping to help you through that today.

I use a testing suite known as Tape. It follows the [TAP (Test Anything Protocol)](https://testanything.org/) which is what it means, since TAP is language agnostic and you can use it anywhere for anything!

I've never really liked the BDD unit testing suites out there. They're slugish, overwhelming and really big. I'm also not a fan of the way these suites [make you use their tools](https://gist.github.com/dhershman1/095df588ec4edb7298603c08eea6efa3).

## Cons of BDD Tools

Some of these may not even be cons to many:

- Pollutes the global scope with all kinds of unknowns
- Isn't really a standard js friendly system
- Creates a lot of overhead
- You write a lot of unneeded code just to help make sense of things
- Really weird dot notation design pattern?
- Requires lots of setup/configs for every occasion
- Doesn't handle arrow functions well because it relys on global mutation and `this`

There are pros to these tools, however I feel we make our own choices of what Pros are so in my case most of the pros you find out there, I don't really see that way...

## Pros of BDD Tools

- They are a little bit easier to follow along to user stories with
- They have stuff like `.before`, and `.after` (as well as their `each` counterparts)

## Cons of Tape

These are cons I feel some people might have with using a system like tape

- You need to import/require it for each test
- No weird dot notation testing pattern
- Less about writing a book, more about testing
- You need to specify the end of a test using `.end` or `.plan`

## Pros of Tape

- No Global pollution
- Very straight forward
- **Very** fast
- Very alias friendly functions
- `onFinish` and `onFailure` listener functions
- Can work anywhere
- Can Test anything
- Minimal Setup
- No 3rd party build tools like karma needed before testing
  - Not exluding tools like Sinon or vue test utils
- Easy to read and easy to maintain

Sorry. I may have went a little crazy there's more I'd love to list but I will hold back!

## Examples

So let's take a look at an example of what a side by side might look like of both tools

> It's important to note that I am using the commonjs system for both tools since node doesn't do well with import/export yet. You can however easily introduce the esm package to tape to allow import exports. Mocha I am unsure I believe either a build tool or perhaps a package can also be added?

Here's the file we want to test: (index.js)

> Math is a function simply to make use of showing you the before hook with mocha

```js
const math = () => {
  const add = (a, b) => {
    return a + b
  },

  const subtract = (a, b) => {
    return a - b
  },

  const multiply = (a, b) => {
    return a * b
  },

  const divide = (a, b) => {
    return a / b
  }

  return {
    add,
    subtract,
    multiply,
    divide
  }
}

module.exports = math
```

Assuming the files are in a test folder

**Using Mocha**
```js
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
```

**Using Tape**
```js
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
```

Pretty straight forward right?

Another benefit is that getting tape to unit test items like Vue components is pretty easy too, it just requires a simple setup for hookes and a browser window. Done.

While the rest of your tests will be super fast, this setup does take a little bit (building a browser window from thin air is a large task) so it will add anywhere from 1 - 3 seconds onto the full runtime of your tests. However when all of your tests finish in a few miliseconds each, I think the trade off is worth it.
