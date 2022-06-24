process.env.NODE_ENV = 'test'
import express from 'express'
import chai, { assert, expect } from 'chai'
import chaiHttp from 'chai-http'
import bcrypt from 'bcrypt'
import http from 'http'

import { App, app } from '../src/app'
import { usersModel } from '../src/db_pg/models/user'
import { CONFIG } from '../src/config'
import { walletsModel } from '../src/db_pg/models/wallets'
import { transactionCategoriesModel } from '../src/db_pg/models/transactionCategories'
import { transactionsModel } from '../src/db_pg/models/transactions'

chai.use(chaiHttp)

let accessToken: string
let server: http.Server
const email = 'test_kaarelen@gmail.com'
const password = 'orbital1024'

async function login({ email, password, }: { email: string, password: string }): Promise<string> {
    const resp = await fetch(
        `http://${CONFIG.EXPRESS_HOST}:${CONFIG.EXPRESS_PORT}/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    )
    return (await resp.json()).payload.accessToken
}
describe('wallets', () => {
    before(() => {
        server = app.listen(CONFIG.EXPRESS_PORT)
    })
    after(() => {
        server.close()
    })
    beforeEach(async () => {
        await usersModel.create({
            email: email,
            password_hash: await bcrypt.hash(password, CONFIG.DB_SALT)
        })
        const token = await login({ email, password })
        assert.isString(token)
        assert(token.length > 10)
        assert(token.split('.').length == 3)
        accessToken = token
    })
    afterEach((done) => {
        usersModel.destroy({
            where: { email: email }
        })
        done()
    })
    describe('wallets positive flow', () => {
        it('get all wallets', (done) => {
            chai.request(app)
                .get('/wallets/get_all',)
                .set('Authorization', accessToken)
                .end((err, res) => {
                    chai.assert(res.status == 200)
                    chai.assert(typeof res.body['payload'] == 'object')
                    chai.assert(res.body['payload'].length == 0)
                    done()
                })
        })
        it('create wallet', (done) => {
            chai.request(app)
                .post('/wallets/create',)
                .set('Authorization', accessToken)
                .send({
                    name: 'first wallet',
                    wallet_type: 'card',
                    currency: 'USD',
                    balance: '135.998',
                })
                .end((err, res) => {
                    chai.assert([200, 201, 202].includes(res.status))
                    done()
                })
        })
    })
})