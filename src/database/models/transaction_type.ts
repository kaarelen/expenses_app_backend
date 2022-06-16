
import mongoose from 'mongoose'

const TransactionCategorieSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.String,
        required: true,
        'enum': [
            'expence',
            'income'
        ]
    },
    archived: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
    }
})
const TransactionCategorieModel = mongoose.model('transaction_categorie', TransactionCategorieSchema)

export {
    TransactionCategorieSchema,
    TransactionCategorieModel,
}