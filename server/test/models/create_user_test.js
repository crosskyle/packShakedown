const assert = require('assert')
const User = require('../../models/user')

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ email: 'Joe', password: 'foo' })

    joe.save()
      .then(() => {
        // Has Joe been saved successfully
        assert(!joe.isNew)
        done()
      })
  })
})