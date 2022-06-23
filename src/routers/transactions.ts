import express from 'express'
import { Op } from 'sequelize'
import { body } from 'express-validator';

import { HTTP_RESPS } from '../http_resps'
import { validationErrorHandler } from './helpers/error_handler';
import { transactionsModel } from '../db_pg/models/transactions'

const transactions_router = express.Router()
transactions_router
    .post(
        '/get_all',
        body('from').isNumeric(),
        body('to').isNumeric(),
        // TODO add range validation
        validationErrorHandler,
        async (req, res, next) => {
            const from = Number(req.body.from)
            const to = Number(req.body.to)
            const transactions = await transactionsModel.findAll({
                where: {
                    fk_users: { [Op.eq]: res.locals.user },
                    createdAt: { [Op.between]: [from, to], },
                }
            })
            return new HTTP_RESPS.Ok({ payload: transactions }).send(res)
        })
    .post(
        '/create',
        body('amount').isNumeric(),
        body('transaction_comment').isString().isLength({max: 60}),
        body('fk_wallets').isInt(),
        body('fk_transactionCategories').isInt(),
        validationErrorHandler,
        async (req, res, next) => {
            await transactionsModel.create({
                amount: req.body.amount,
                transaction_comment: req.body.transaction_comment,
                fk_users: res.locals.user,
                fk_wallets: req.body.fk_wallets,
                fk_transactionCategories: req.body.fk_transactionCategories,
            })
            return new HTTP_RESPS.Created().send(res)
        })
    .post(
        '/update',
        async (req, res, next) => {
            return new HTTP_RESPS.NotImplimented().send(res)
        })
    .post(
        '/delete',
        async (req, res, next) => {
            return new HTTP_RESPS.NotImplimented().send(res)
        })

export { transactions_router }