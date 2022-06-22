import { Model, Optional, Sequelize } from 'sequelize'
import { CONFIG } from '../config'

const pg_client = new Sequelize(
    CONFIG.PG_DATABASE,
    CONFIG.PG_USER,
    CONFIG.PG_PASSWORD,
    {
        host: CONFIG.PG_HOST,
        port: Number(CONFIG.PG_PORT),
        dialect: 'postgres',
        logging: false,
        native: true,
        define: {
            freezeTableName: true
        }
    })

console.log('connected to pg')

export { pg_client }
