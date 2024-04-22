const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, required: true, default: "Hey there! I am using ChatApp." },
    pic: {
        type: String,
        default: "https://img.icons8.com/color/48/test-account.png"
    },
},
    {
        timestamps: true
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


const User = mongoose.model("User", userSchema);
module.exports = User;


// add toggle mode for pin message ..
// and wisper mode for dissapearing message in 5 sec if possible...