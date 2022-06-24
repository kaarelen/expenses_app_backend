import express from 'express'
import sequelize, { Op } from 'sequelize'
import { body } from 'express-validator';

import { HTTP_RESPS } from '../http_resps'
import { validationErrorHandler } from './helpers/error_handler';
import { currency_enum, walletsModel, wallet_type_enum } from '../db_pg/models/wallets'

const wallets_router = express.Router()
wallets_router
    .get(
        '/get_all',
        async (req, res, next) => {
            const wallets = await walletsModel.findAll({
                where: {
                    fk_users: { [Op.eq]: res.locals.user }
                }
            })
            return new HTTP_RESPS.Ok({ payload: wallets }).send(res)
        })
    .post(
        '/create',
        body('name').isString().isLength({ max: 24 }),
        body('wallet_type').isString().isIn(wallet_type_enum),
        body('currency').isString().isIn(currency_enum),
        body('balance').isNumeric(),
        validationErrorHandler,
        async (req, res, next) => {
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

export { wallets_router }