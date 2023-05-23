import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const USER  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});  

USER.pre('save',async function(next) {
    const hasPassword = await bcrypt.hash(this.password,12);
    this.password = hasPassword;
    next();
})

export default mongoose.model("User", USER); //Essa linha de código exporta o modelo de usuário criado usando o Mongoose.