// config.js
require('dotenv').config();
module.exports = {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017',
  dbName: process.env.DB_NAME || 'steamDB',
  gameListApiUrl: 'https://api.steampowered.com/ISteamApps/GetAppList/v2/'
};