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
    // SECRET
    DB_SALT: get_env_variable('DB_SALT', '', true),
    JWT_SECRET_TOKEN: get_env_variable('JWT_SECRET_TOKEN', '', true),
    // PG
    PG_USER: get_env_variable('PG_USER', ''),
    PG_HOST: get_env_variable('PG_HOST', ''),
    PG_DATABASE: get_env_variable('PG_DATABASE', ''),
    PG_PASSWORD: get_env_variable('PG_PASSWORD', ''),
    PG_PORT: get_env_variable('PG_PORT', '5432'),
    // else
    NODE_ENV: get_env_variable('NODE_ENV', 'prod'),
    EXPRESS_HOST: get_env_variable('EXPRESS_HOST', 'localhost'),
    EXPRESS_PORT: get_env_variable('EXPRESS_PORT', '4000'),
}
export { CONFIG }