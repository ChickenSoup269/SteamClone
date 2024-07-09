const gameRoutes = require("./gameRoutes");
const genresRoutes = require("./genresRoutes");
const UserRouter = require('./UserRouter')
// Contains routes 
function route(app) {
  app.use('/', gameRoutes)
  app.use('/category',genresRoutes)
  app.use('/api/user', UserRouter)
}
module.exports = route;