// import library
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const path = require("path")
const connectDB = require('./config/db');
// const { autoFetchData } = require('./utils/fetchGameDetails');
const userRoutes = require("./routes/appRoutes")
// Configure environment variables
dotenv.config()

// Create Express app
const app = express()
const port = process.env.PORT || 3001  

// Middleware setup
app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(morgan("combined"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())

// Import and setup routes
userRoutes(app)

// Connect to MongoDB
connectDB().then(() => {
  // autoFetchData();
});
// Start the server
app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`)
})
