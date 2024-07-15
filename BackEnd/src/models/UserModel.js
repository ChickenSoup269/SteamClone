const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true},
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number },
<<<<<<< HEAD
        access_token: { type: String, require: true },
        refresh_token: { type: String, require: true},
=======
        wallet: { type: Number, default: 5000000 },
        access_token: { type: String, require: true },
        refresh_token: { type: String, require: true },
        cart: { type: Object, default: {} } 
>>>>>>> 9acaa28dc5d2f5fce6c0be3f5313c4f0d685b239
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;