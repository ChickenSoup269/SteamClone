const gameRoutes = require("./gameRoutes");
const genresRoutes = require("./genresRoutes");
const UserRouter = require('./UserRouter')
const OrderRouter = require('./OrderRouter')
// Contains routes 
function route(app) {
  app.use('/', gameRoutes)
  app.use('/user', UserRouter)
  app.use('/genres',genresRoutes)
  app.use('/order', OrderRouter)
}
module.exports = route;