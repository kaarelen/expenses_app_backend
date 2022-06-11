import mongoose from 'mongoose'
import { CONFIG } from '../config.js';

async function connect_mongo_db() {
    let db = await mongoose.connect(
        `mongodb://${CONFIG.MONGO_HOST}`,
        {
            dbName: CONFIG.MONGO_DB_NAME,
            autoIndex: false,
            serverSelectionTimeoutMS: 1000,
        },
    )
    console.log('connected to mongo')
    return db
}

export { connect_mongo_db }