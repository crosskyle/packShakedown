/**
 * Created by kylecross on 7/11/17.
 */

const UsersController = require('../controllers/users_controller')

module.exports = (app) => {

  app.post('/api/users', UsersController.create_user)

  //app.post('api/users/:id/packs', UsersController.create_pack)

  //app.delete('/api/users/:id', UsersController.delete_user)
}