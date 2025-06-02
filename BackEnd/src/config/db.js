const mongoose = require('mongoose');
const dotenv = require("dotenv")
dotenv.config();
const connectDB = async () => {
  try {
    // mongoose.set('debug', true); 
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;