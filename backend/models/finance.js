import mongoose from "mongoose";

const financeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        enum: ['Grocery', 'Electronics', 'Snacks', 'Books', 'Others'],
        required: true
    }
})

export default mongoose.model('Finance', financeSchema);