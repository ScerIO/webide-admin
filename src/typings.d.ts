declare module '*.pug' {
  const content: () => string
  export = content
}

declare module '*.css' {
  const content: string
  export = content
}

declare const process: {
  env: {
    APP_ENV: string
  }
}

declare const appVersion: string
