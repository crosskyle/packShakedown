const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/pack_test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach((done) => {
  const { users, packs, categories, items } = mongoose.connection.collections;
  users.drop(() => {
    packs.drop(() => {
      categories.drop(() => {
        items.drop()
          .then(() => done())
          .catch(() => done())
      });
    });
  });
});
