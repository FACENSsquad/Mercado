import mongoose from "mongoose";



const Produto = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})

export default mongoose.model("produtos", Produto);