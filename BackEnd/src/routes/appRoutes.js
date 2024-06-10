const gameRoutes = require("./gameRoutes");
function route(app) {
  app.use('/',gameRoutes)
}
module.exports = route;