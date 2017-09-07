const assert = require('assert')
const request = require('supertest')
const app = require('../../app')
const mongoose = require('mongoose')
const User = mongoose.model('user')

describe('Users controller', () => {
  it('Post to /api/users creates a new user', (done) => {
    User.count().then(count => {
      request(app)
        .post('/api/users')
        .send({ email: 'test@test.com', password: 'password' })
        .end((err, response) => {
          User.count().then(newCount => {
            assert(count + 1 === newCount)
            done()
          })
        })
    })
  })

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

  it('Post to /api/users/:userId/packs/:packId/items creates a new item', (done) => {
    const user = new User({
      email: 'test@test.com',
      password: 'password',
      packs: [{
        title: 'pack',
        items: []
      }]
    })

    user.save().then(() => {
      request(app)
        .post(`/api/users/${user._id}/packs/${user.packs[0]._id}/items`)
        .send({ title: 'item', description: 'desc' })
        .end((err, response) => {
          User.findOne({ email: 'test@test.com' })
            .then(user => {
              assert(user.packs[0].items.length === 1)
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
        title: 'pack'
      }]
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

  it('GET to /api/users/:userId/packs/:packId/items/:itemId reads an item', (done) => {
    const user = new User({
      email: 'test@test.com',
      password: 'password',
      packs: [{
        items: [{
          title: 'toothbrush'
        }]
      }]
    })

    user.save().then(() => {
      request(app)
        .get(`/api/users/${user._id}/packs/${user.packs[0]._id}/items/${user.packs[0].items[0]._id}`)
        .send()
        .end((err, response) => {
          assert(response.body.title === 'toothbrush')
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

  it('PUT to /api/users/:userId/packs/:packId/items/:itemId updates an item', (done) => {
    const user = new User({
      email: 'test@test.com',
      password: 'password',
      packs: [{
        items: {
          title: 'toothbrush'
        }
      }]
    })

    user.save().then(() => {
      request(app)
        .put(`/api/users/${user._id}/packs/${user.packs[0]._id}/items/${user.packs[0].items[0]._id}`)
        .send({ title: 'flashlight'})
        .end((err, response) => {
          assert(response.body.title === 'flashlight')
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

  it('DELETE to /api/users/:userId/packs/:packsId/items removes an item', (done) => {
    const user = new User({
      email: 'test@t.com',
      password: 'password',
      packs: [{
        title: 'simple',
        items:[{
          title: 'toothbrush'
        }]
      }]
    })

    user.save().then(() => {
      request(app)
        .delete(`/api/users/${user._id}/packs/${user.packs[0]._id}/items/${user.packs[0].items[0]._id}`)
        .send()
        .end(() => {
          User.findOne({ email: 'test@t.com' })
            .then(user => {
              assert(user.packs[0].items.length === 0)
              done()
            })
        })
    })
  })


})
//