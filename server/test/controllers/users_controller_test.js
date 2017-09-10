const assert = require('assert')
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const User = mongoose.model('user')

describe.skip('Users controller', () => {

  it('Post to /api/users/:userId/packs creates a new pack', (done) => {
    const user = new User({ email: 'test@test.com', password: 'password', packs: [] })

    user.save().then(() => {
      request(app)
        .post(`/api/users/${user._id}/packs`)
        .send({ title: 'pack', description: 'desc' })
        .end((err, response) => {
          User.findOne({ email: 'test@test.com' })
            .then(user => {
              assert(user.packs.length === 1)
              done()
            })
        })
    })
  })

  it('Post to /api/users/:userId/items creates a new item', (done) => {
    const user = new User({ email: 'test@test.com', password: 'password' })

    user.save().then(() => {
      request(app)
        .post(`/api/users/${user._id}/items`)
        .send({ title: 'item' })
        .end((err, response) => {
          User.findOne({ email: 'test@test.com' })
            .then(user => {
              assert(user.items.length === 1)
              done()
            })
        })
    })
  })

  it('GET to /api/users/:userId reads a user', (done) => {
    const user = new User({ email: 'test@test.com', password: 'password', packs: [] })

    user.save().then(() => {
      request(app)
        .get(`/api/users/${user._id}`)
        .send()
        .end((err, response) => {
          assert(response.body.email === 'test@test.com')
          done()
        })
    })
  })

  it('GET to /api/users/:userId/packs/:packId reads a pack', (done) => {
    const user = new User({
      email: 'test@test.com',
      password: 'password',
      packs: [{
        title: 'pack',
        description: 'desc',
        itemIds: ['string', 'string']
      }],
      items: [{ title: 'soap'}, {title: 'quilt'}, {title: 'tarp'}]
    })

    user.save().then(() => {
      request(app)
        .get(`/api/users/${user._id}/packs/${user.packs[0]._id}`)
        .send()
        .end((err, response) => {
          assert(response.body.title === 'pack')
          done()
        })
    })
  })

  it('GET to /api/users/:userId/items reads items list', (done) => {
    const user = new User({
      email: 'test@test.com',
      password: 'password',
      items: [{
        title: 'item'
      }]
    })

    user.save().then(() => {
      request(app)
        .get(`/api/users/${user._id}/items`)
        .send()
        .end((err, response) => {
          assert(response.body[0].title === 'item')
          done()
        })
    })
  })

  it('PUT to /api/users/:userId/packs/:packId updates a pack', (done) => {
    const user = new User({
      email: 'test@test.com',
      password: 'password',
      packs: [{
        title: 'pack'
      }]
    })

    user.save().then(() => {
      request(app)
        .put(`/api/users/${user._id}/packs/${user.packs[0]._id}`)
        .send({ title: 'simple pack'})
        .end((err, response) => {
          assert(response.body.title === 'simple pack')
          done()
        })
    })
  })

  it('PUT to /api/users/:userId/items/:itemId updates an item', (done) => {
    const user = new User({
      email: 'test@test.com',
      password: 'password',
      items: [{
        title: 'title'
      }]
    })

    user.save().then(() => {
      request(app)
        .put(`/api/users/${user._id}/items/${user.items[0]._id}`)
        .send({ title: 'soap'})
        .end((err, response) => {
          assert(response.body.title === 'soap')
          done()
        })
    })
  })

  it('DELETE to /api/users/:userId removes a user', (done) => {
    const user = new User({ email: 'test@t.com', password: 'password' })

    user.save().then(() => {
      request(app)
        .delete(`/api/users/${user._id}`)
        .send()
        .end(() => {
          User.findOne({ email: 'test@t.com' })
            .then(user => {
              assert(user === null)
              done()
            })
        })
    })
  })

  it('DELETE to /api/users/:userId/packs/:packsId removes a pack', (done) => {
    const user = new User({
      email: 'test@t.com',
      password: 'password',
      packs: [{
        title: 'simple'
      }]
    })

    user.save().then(() => {
      request(app)
        .delete(`/api/users/${user._id}/packs/${user.packs[0]._id}`)
        .send()
        .end(() => {
          User.findOne({ email: 'test@t.com' })
            .then(user => {
              assert(user.packs.length === 0)
              done()
            })
        })
    })
  })

  it('DELETE to /api/users/:userId/items/:itemId removes an item', (done) => {
    const user = new User({
      email: 'test@t.com',
      password: 'password',
      items: [{
        title: 'toothbrush'
      }]
    })

    user.save().then(() => {
      request(app)
        .delete(`/api/users/${user._id}/items/${user.items[0]._id}`)
        .send()
        .end(() => {
          User.findOne({ email: 'test@t.com' })
            .then(user => {
              assert(user.items.length === 0)
              done()
            })
        })
    })
  })
})
