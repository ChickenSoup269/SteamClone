// config.js
require("dotenv").config()
module.exports = {
  port: process.env.PORT || 3001,
  mongoUrl: process.env.MONGO_URL || "mongodb://127.0.0.1:27017",
  dbName: process.env.DB_NAME || "steamDB",
  gameListApiUrl:
    process.env.GAME_LIST_API_URL ||
    "https://api.steampowered.com/ISteamApps/GetAppList/v2/",
  gameDetailsApiUrl:
    process.env.GAME_DETAILS_API_URL ||
    "https://store.steampowered.com/api/appdetails?appids=",
}
