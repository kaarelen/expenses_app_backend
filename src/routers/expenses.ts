

import express from 'express';
import jwt from 'jsonwebtoken';

import { UserModel, hash_user_passord } from '../database/models/user';
import { HTTP_RESPS } from '../http_resps';

const jwt_auth_secret_token = 'ded9ff2454a1fbe50d83ca027ea20d1875ff1effb21e2fc4ecfae796f4ddee6e';
const expenses_router = express.Router()

expenses_router
    .get('/get_name', async (req, res, next) => {
        return new HTTP_RESPS.Ok({ payload: { data: '123' } }).send(res)
    })
export {
    expenses_router,
}