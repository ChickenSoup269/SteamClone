const gameRouter = require("./gameRoutes");
const genresRouter = require("./genresRoutes");
const UserRouter = require('./UserRouter')
const AuthRouter = require('./authRoutes')
const ReviewRouter = require('./reviewsRoutes')
const OrderRouter = require('./ordersRoutes')
const PaymentRouter = require('./paymentRoutes')
const UsergamRouter = require('./usergameRoutes')
// Contains routes 
function route(app) {
  app.use('/', gameRouter)
  app.use('/user', UserRouter)
  app.use('/genres', genresRouter)
  app.use('/auth', AuthRouter)
  app.use('/reviews', ReviewRouter)
  app.use('/orders', OrderRouter)
  app.use('/payment', PaymentRouter)
  app.use('/usergame',UsergamRouter)
}
module.exports = route;