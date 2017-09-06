
const assert = require('assert')
const User = require('../models/user')

describe('Subdocuments', () => {
  it('can create subdocuments', (done) => {
    const user = new User({
      email: 'Joe@email.com',
      password: 'foo',
      packs: [{
        title: 'title',
        description: 'desc',
        items: [{
          category: 'cat',
          title: 'title',
          description: 'desc',
          weight: 10,
          quantity: 10
        }]
      }]
    })
    user.save()
      .then(() => User.findOne({ email: 'joe@email.com' }))
      .then((user) => {
        assert(user.packs[0].items[0].weight === 10)
        done()
      })
  })


  it('Can add subdocuments to an existing record', (done) => {
    const user = new User({
      email: 'user@email.com',
      password: 'foo',
      packs: []
    })
    user.save()
      .then(() => User.findOne({ email: 'user@email.com' })) // same as { return User.findOne..... }
      .then((user) => {
        user.packs.push({
          title: 'title',
          description: 'desc',
          items: [{
            category: 'cat',
            title: 'title',
            description: 'desc',
            weight: 10,
            quantity: 10
          }]
        })
        return user.save() // must return to include another callback after promise
      })
      .then(() => User.findOne({ email: 'user@email.com' }))
      .then((user) => {
        assert(user.packs[0].items[0].weight === 10)
        done()
      })
  })

  it('Can remove subdocuments to an existing record', (done) => {
    const user = new User({
      email: 'user@email.com',
      password: 'foo',
      packs: [{
        title: 'title',
        description: 'desc',
        items: [{
          category: 'cat',
          title: 'title',
          description: 'desc',
          weight: 10,
          quantity: 10
        }]
      }]
    })
    user.save()
      .then(() => User.findOne({ email: 'user@email.com' })) // same as { return User.findOne..... }
      .then((user) => {
        user.packs[0].items[0].remove()
        return user.save() // must return to include another callback after promise
      })
      .then(() => User.findOne({ email: 'user@email.com' }))
      .then((user) => {
        assert(user.packs[0].items.length === 0)
        done()
      })
  })
})
