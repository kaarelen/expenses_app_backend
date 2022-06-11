import 'dotenv/config'


const CONFIG = {
    DB_SALT: null,
    MONGO_HOST: 'localhost:27017',
    MONGO_DB_NAME: 'notes_app',
    EXPRESS_HOST: 'localhost',
    EXPRESS_PORT: 3000,
}

const required_env_variables = ['DB_SALT']

required_env_variables.forEach(
    key => {
        let env_vairable = process.env[key]
        if (env_vairable == null) {
            throw new Error(`Error occured on getting ${key} .env variable.`)
        }
        CONFIG[key] = env_vairable
    })

export { CONFIG }