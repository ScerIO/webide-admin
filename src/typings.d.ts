declare module '*.pug' {
  const content: () => string
  export = content
}

declare module '*.css' {
  const content: string
  export = content
}

declare module '@polymer/polymer/polymer-element' {
  export const PolymerElement: new () => Polymer.Element
  export const html: (...args: any[]) =>string

  export type PolymerElementType = typeof PolymerElement
}
