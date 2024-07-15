const gameRoutes = require("./gameRoutes");
const genresRoutes = require("./genresRoutes");
const UserRouter = require('./UserRouter')
// Contains routes 
function route(app) {
  app.use('/category',genresRoutes)
  app.use('/cart', cartRoutes)
  app.use('/user', UserRouter)
  app.use('/', gameRoutes)
}
module.exports = route;