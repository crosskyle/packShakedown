const CreateController = require('../controllers/create_controller')
const ReadController = require('../controllers/read_controller')
const UpdateController = require('../controllers/update_controller')
const AuthController = require('../controllers/auth_controller')
const DeleteController = require('../controllers/delete_controller')
const passportService = require('../services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false }) // for protecting routes
const requireSignin = passport.authenticate('local', { session: false })

module.exports = (app) => {

  // Authentication

  app.post('/api/signin', requireSignin, AuthController.signin)

  app.post('/api/signup', AuthController.signup)

  // Create

  app.post('/api/users/:userId/packs', CreateController.create_pack)

  app.post('/api/users/:userId/packs/:packId/categories', CreateController.create_category)

  app.post('/api/users/:userId/packs/:packId/categories/:categoryId/items', CreateController.create_item_in_category)

  app.post('/api/users/:userId/items', CreateController.create_item)

  // Read

  app.get('/api/users/:userId', ReadController.read_user)

  app.get('/api/users/:userId/packs', ReadController.read_packs)

  app.get('/api/users/:userId/packs/:packId', ReadController.read_pack)

  // Update

  app.put('/api/users/:userId/packs/:packId', UpdateController.update_pack)

  app.patch('/api/users/:userId/packs/:packId/categories/:categoryId/items/:itemId', UpdateController.update_item)

  app.put('/api/users/:userId/packs/:packId/categories/:categoryId/items/:itemId', UpdateController.put_item_in_category)

  // Delete

  app.delete('/api/users/:userId/items/:itemId', DeleteController.delete_item)

  app.delete('/api/users/:userId/packs/:packId', DeleteController.delete_pack)

  app.delete('/api/users/:userId/packs/:packId/categories/:categoryId', DeleteController.delete_category)

  app.delete('/api/users/:userId/packs/:packId/categories/:categoryId/items/:itemId', DeleteController.remove_item_from_category)
}
