import express from 'express';

import { HTTP_RESPS } from '../http_resps';
import { CONFIG } from '../config';
import { WalletModel } from '../database/models/wallet';
import { UserModel } from '../database/models/user';

const wallet_router = express.Router()

wallet_router
    .get('/get_all', async (req, res, next) => {
        const user = await UserModel.findOne({ _id: res.locals.user })
        return new HTTP_RESPS.Ok({
            payload: {
                wallets: user.wallets
            }
        }).send(res)
    })
    .post('/create', async (req, res, next) => {
        // sick! TODO: write requset body validation (not only here)
        const name = req.body.name
        const wallet_type = req.body.wallet_type
        const currency = req.body.currency
        const balance = req.body.balance

        const wallet = new WalletModel({
            name: name,
            wallet_type: wallet_type,
            currency: currency,
            balance: balance,
            archived: false,
        })

        wallet.validate()
        const user = await UserModel.findOne({ _id: res.locals.user })
        user.wallets.push(wallet)
        await user.save()
        return new HTTP_RESPS.Created().send(res)
    })
    .post('/update', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })
    .post('/delete', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })

export { wallet_router }