import mongoose from 'mongoose'


const WalletSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    wallet_type: {
        type: mongoose.Schema.Types.String,
        required: true,
        'enum': [
            'cash',
            'card',
        ],
    },
    currency: {
        type: mongoose.Schema.Types.String,
        required: true,
        'enum': [
            'USD',
            'EUR',
            'UAH'
        ],
    },
    balance: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    archived: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
    }
})
const WalletModel = mongoose.model('wallet', WalletSchema)

export {
    WalletSchema,
    WalletModel,
}