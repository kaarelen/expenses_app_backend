import express from 'express';

import { HTTP_RESPS } from '../http_resps';
import { CONFIG } from '../config';
import { UserModel } from '../database/models/user';
import { TransactionCategorieModel } from '../database/models/transaction_categorie';

const transaction_categories_router = express.Router()

transaction_categories_router
    .get('/get_all', async (req, res, next) => {
        const user = await UserModel.findOne({ _id: res.locals.user })
        return new HTTP_RESPS.Ok({
            payload: {
                transaction_categories: user.transaction_categories
            }
        }).send(res)
    })
    .post('/create', async (req, res, next) => {
        const name = req.body.name
        const type = req.body.type

        const transaction_categorie = new TransactionCategorieModel({
            name: name,
            type: type,
            archived: false,
        })

        await transaction_categorie.validate()
        const user = await UserModel.findOne({ _id: res.locals.user })
        user.transaction_categories.push(transaction_categorie)
        await user.save()
        return new HTTP_RESPS.Created().send(res)
    })
    .post('/update', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })
    .post('/delete', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })

export { transaction_categories_router }