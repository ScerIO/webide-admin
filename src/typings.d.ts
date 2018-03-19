declare module '*.pug' {
  const content: () => string
  export = content
}

declare module '*.css' {
  const content: string
  export = content
}
