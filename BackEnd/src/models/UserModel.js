const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true},
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number },
        avatar: { type: String },
        wallet: { type: Number, default: 5000000 },
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;