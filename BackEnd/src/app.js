// import library
const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const path = require("path")
const { fetchDataAndSaveToMongo } = require("./utils/apiUtils")

// Configure environment variables
dotenv.config()

// Create Express app
const app = express()
const port = process.env.PORT || 3001

// Middleware setup
app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb" }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(morgan("combined"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())

// Import and setup routes
const userRoutes = require("./routes/appRoutes")
userRoutes(app)

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect database successful!")
  })
  .catch((err) => {
    console.log(err)
  })

// Start the server
app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`)
  // Fetch and save data to MongoDB when server starts
  await fetchDataAndSaveToMongo()
})
