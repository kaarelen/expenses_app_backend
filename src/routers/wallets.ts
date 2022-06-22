import express from 'express'
import sequelize, { Op } from 'sequelize'

import { HTTP_RESPS } from '../http_resps'
import { walletsModel } from '../db_pg/models/wallets'

const wallets_router = express.Router()
wallets_router
    .get('/get_all', async (req, res, next) => {
        const wallets = await walletsModel.findAll({
            where: {
                fk_users: { [Op.eq]: res.locals.user }
            }
        })
        return new HTTP_RESPS.Ok({ payload: wallets }).send(res)
    })
    .post('/create', async (req, res, next) => {
        // sick! TODO: write requset body validation (not only here)
        await walletsModel.create({
            name: req.body.name,
            wallet_type: req.body.wallet_type,
            currency: req.body.currency,
            balance: req.body.balance,
            archived: false,
            fk_users: res.locals.user,
        })
        return new HTTP_RESPS.Created().send(res)
    })
    .post('/update', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })
    .post('/delete', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })

export { wallets_router }