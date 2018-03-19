import {
  Element as PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import '@polymer/paper-styles/color'
import '@polymer/paper-styles/shadow'
import '@polymer/paper-input/paper-input'
import '@polymer/paper-button/paper-button'
import '@polymer/app-storage/app-localstorage/app-localstorage-document'
import ApolloElement from '../apollo'
import gql from 'graphql-tag'
import * as view from './template.pug'
import * as style from './style.css'
import { tokenAuth } from '../api/auth'
import { IUser } from '../api/user'

// TODO: use https://github.com/Polymer/polymer-decorators

export default class AppLogin extends ApolloElement(PolymerElement) {

  private token: string = ''
  private email: string = ''
  private isAdmin: boolean = false
  private firstName: string = ''
  private lastName: string = ''
  private picture: string = ''

  public static get template() {
    return html([`<style>${style}</style>${view()}`])
  }

  public async login() {
    // @ts-ignore
    const user: IUser = (await this.$apollo.mutate({
      mutation: tokenAuth,
      variables: {
        token: this.token,
      },
    })).data.auth.signIn
    Object.assign(this, user)
  }

}

window.customElements.define('app-login', AppLogin)
