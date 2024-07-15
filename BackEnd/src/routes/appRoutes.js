const gameRoutes = require("./gameRoutes");
const genresRoutes = require("./genresRoutes");
const UserRouter = require('./UserRouter')
// Contains routes 
function route(app) {
<<<<<<< HEAD
=======
  app.use('/category',genresRoutes)
  // app.use('/cart', cartRoutes)
  app.use('/user', UserRouter)
>>>>>>> 9acaa28dc5d2f5fce6c0be3f5313c4f0d685b239
  app.use('/', gameRoutes)
  app.use('/category',genresRoutes)
  app.use('/api/user', UserRouter)
}
module.exports = route;