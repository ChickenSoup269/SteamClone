const gameRouter = require("./gameRoutes");
const genresRouter = require("./genresRoutes");
const UserRouter = require('./UserRouter')
const AuthRouter = require('./authRoutes')
const ReviewRouter = require('./reviewsRoutes')
// Contains routes 
function route(app) {
  app.use('/', gameRouter)
  app.use('/user', UserRouter)
  app.use('/genres', genresRouter)
  app.use('/auth', AuthRouter)
  app.use('/reviews',ReviewRouter)
}
module.exports = route;