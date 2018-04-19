/**
 * All enviroments
 */
export enum Enviroment {
  production = 'production',
  staging = 'staging',
  development = 'development',
}

/**
 * Enviroment value selector
 * *
 * @param envObject
 * *
 * @example
 * enviroment({
 *  staging: 'hello from staging',
 *  development: 'hello from development',
 * })
 */
export default function enviroment({ production, staging, development }: { [enviroment: string]: any }) {
  switch (String(process.env.APP_ENV)) {
    case Enviroment.production:
      return production
    case Enviroment.staging:
      return staging
    default:
      return development
  }
}
