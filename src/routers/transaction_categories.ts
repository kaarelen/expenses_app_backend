import express from 'express'

import { HTTP_RESPS } from '../http_resps'
import { transactionCategoriesModel } from '../db_pg/models/transactionCategories'

const transaction_categories_router = express.Router()
transaction_categories_router
    .get('/get_all', async (req, res, next) => {
        const categories = await transactionCategoriesModel.findAll({
            where: { fk_users: res.locals.user }
        })
        return new HTTP_RESPS.Ok({
            payload: categories
        }).send(res)
    })
    .post('/create', async (req, res, next) => {
        await transactionCategoriesModel.create({
            name: req.body.name,
            categorie_type: req.body.categorie_type,
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

export { transaction_categories_router }