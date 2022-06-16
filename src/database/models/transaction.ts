import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    // required: [],
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    comment: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    time: {
        type: mongoose.Schema.Types.Number,
        required: true,
    }
})
const TransactionModel = mongoose.model('transaction', TransactionSchema)

export {
    TransactionSchema,
    TransactionModel,
}