import express from 'express';

import { HTTP_RESPS } from '../http_resps';
import { CONFIG } from '../config';

const wallet_router = express.Router()

wallet_router
    .post('/create', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })
    .post('/update', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })
    .post('/delete', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })

export { wallet_router }