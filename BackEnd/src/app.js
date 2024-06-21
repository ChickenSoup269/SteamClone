// import library 
const express = require('express');
const morgan = require("morgan"); 
const { fetchDataAndSaveToMongo } = require('./utils/apiUtils');
const path = require('path');
// import structure
const config = require('./config/mongodb');  
const port = config.port;
const app = express()
app.use(express.static(path.join(__dirname,'public')))// xử lý static file nằm trong public 
// req HTTP  
app.use(morgan('combined'))
app.use(express.json());
// import routes 
const userRoutes = require('./routes/appRoutes');
// Routes init
userRoutes(app);
// start server
app.listen(port, async () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
  // Fetch and save data to MongoDB when server starts
  await fetchDataAndSaveToMongo();
});


