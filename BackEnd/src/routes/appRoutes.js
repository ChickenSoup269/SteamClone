const gameRoutes = require("./gameRoutes");
const genresRoutes = require("./genresRoutes");
// Contains routes 
function route(app) {
  app.use('/category',genresRoutes)
  app.use('/', gameRoutes)
}
module.exports = route;