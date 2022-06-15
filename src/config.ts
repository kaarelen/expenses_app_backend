import 'dotenv/config'

function get_env_variable(key: string, default_value: string, required_in_env: boolean = false): string {
    if (key in process.env) {
        return String(process.env[key])
    } else if (required_in_env) {
        throw Error(`${key} must be in env or .env`)
    } else {
        return default_value
    }
}

const CONFIG = {
    NODE_ENV: get_env_variable('NODE_ENV', 'production', true),
    DB_SALT: get_env_variable('DB_SALT', '', true),
    JWT_SECRET_TOKEN: get_env_variable('JWT_SECRET_TOKEN', '', true),
    MONGO_HOST: get_env_variable('MONGO_HOST', 'localhost:27017'),
    MONGO_DB_NAME: get_env_variable('MONGO_DB_NAME', 'notes_app'),
    EXPRESS_HOST: get_env_variable('EXPRESS_HOST', 'localhost'),
    EXPRESS_PORT: get_env_variable('EXPRESS_PORT', '3000'),
}

export { CONFIG }