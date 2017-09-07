const assert = require('assert')
const User = require('../../models/user')

describe('Updating records', () => {
  let user

  beforeEach((done) => {
    user = new User({ email: 'user@email.com', password: 'password' })
    user.save()
      .then(() => done())
  })

  function assertEmail(operation, done) {
    operation.
      then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1)
        assert(users[0].email === 'new_user@email.com')
        done()
      })
  }

  it('instance type using set and save', (done) => {
    // use for piecemeal updates over time
    user.set('email', 'new_user@email.com')
    assertEmail(user.save(), done)
  })

  it('A model instance can update', (done) => {
    // update right away
    assertEmail(user.update({ email: 'new_user@email.com' }), done)
  })

  it('A model class can update', (done) => {
    assertEmail(
      User.update({ email: 'user@email.com' }, { email: 'new_user@email.com' }),
      done
    )
  })

  it('A model class can update one record', (done) => {
    assertEmail(
      User.findOneAndUpdate({ email: 'user@email.com' }, { email: 'new_user@email.com' }),
      done
    )
  })

  it('A model class can find a record with an Id and update', (done) => {
    assertEmail(
      User.findByIdAndUpdate(user._id, { email: 'new_user@email.com' }),
      done
    )
  })
})