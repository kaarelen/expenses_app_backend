import express from 'express'
import { Op } from 'sequelize'

import { HTTP_RESPS } from '../http_resps'
import { transactionsModel } from '../db_pg/models/transactions'

const transactions_router = express.Router()
transactions_router
    .post('/get_all', async (req, res, next) => {
        const from = Number(req.body.from)
        const to = Number(req.body.to)
        const transactions = await transactionsModel.findAll({
            where: {
                fk_users: { [Op.eq]: res.locals.user },
                createdAt: {
                    [Op.between]: [from, to],
                },
            }
        })
        return new HTTP_RESPS.Ok({ payload: transactions }).send(res)
    })
    .post('/create', async (req, res, next) => {
        await transactionsModel.create({
            amount: req.body.amount,
            transaction_comment: req.body.transaction_comment,
            fk_users: res.locals.user,
            fk_wallets: req.body.fk_wallets,
            fk_transactionCategories: req.body.fk_transactionCategories,
        })
        return new HTTP_RESPS.Created().send(res)
    })
    .post('/update', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })
    .post('/delete', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })

export { transactions_router }