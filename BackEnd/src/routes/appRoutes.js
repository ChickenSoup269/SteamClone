const gameRoutes = require("./gameRoutes");
// Contains routes 
function route(app) {
  app.use('/', gameRoutes)
  
}
module.exports = route;