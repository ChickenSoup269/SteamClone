const gameRoutes = require("./gameRoutes");
const genresRoutes = require("./genresRoutes");
const UserRouter = require('./UserRouter')
const OrderRouter = require('./OrderRouter')
// Contains routes 
function route(app) {
  app.use('/category',genresRoutes)
  app.use('/user', UserRouter)
  app.use('/', gameRoutes)
  app.use('/order', OrderRouter)
}
module.exports = route;