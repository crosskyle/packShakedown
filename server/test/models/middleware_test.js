const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../../models/user')
const Item = require('../../models/item')
const Category = require('../../models/category')
const Pack = require('../../models/pack')

describe('Middleware', () => {
  let joe, pack, category, item1, item2

  beforeEach((done) => {
    joe = new User({ email: 'joe@test.com', password: 'password' })
    pack = new Pack({ title: 'simple pack', description: 'simple desc' })
    category = new Category({ title: 'shelter' })
    item1 = new Item({ title: 'toothbrush', consumable: false })
    item2 = new Item({ title: 'soap', consumable: true })

    joe.packs.push(pack)
    pack.categories.push(category)
    category.items.push(item1)
    joe.items.push(item1)
    joe.items.push(item2)


    Promise.all([joe.save(), pack.save(), category.save(), item1.save(), item2.save()])
      .then(() => done())
  });

  it('users clean up dangling items on remove', (done) => {
    pack.remove()
      .then(() => Category.count())
      .then((count) => {
        assert(count === 0)
        done()
      })
  })
})

describe('Middleware', () => {
  let joe, pack, category, item1, item2;

  beforeEach((done) => {
    joe = new User({ email: 'joe@test.com', password: 'password' })
    pack = new Pack({ title: 'simple pack', description: 'simple desc' })
    category = new Category({ title: 'shelter' })
    item1 = new Item({ title: 'toothbrush', consumable: false })
    item2 = new Item({ title: 'soap', consumable: true })

    joe.packs.push(pack)
    pack.categories.push(category)
    category.items.push(item1)
    joe.items.push(item1)
    joe.items.push(item2)


    Promise.all([joe.save(), pack.save(), category.save(), item1.save(), item2.save()])
      .then(() => done())
  });

  it('users clean up dangling items on remove', (done) => {
    pack.remove()
      .then(() => Category.count())
      .then((count) => {
        assert(count === 0)
        done()
      })
  })
})
