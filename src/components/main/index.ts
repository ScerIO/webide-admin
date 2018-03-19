import {
  Element as PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import { importHref } from '@polymer/polymer/lib/utils/import-href'
import '@polymer/iron-pages/iron-pages'
import '@polymer/iron-selector/iron-selector'
import '@polymer/app-route/app-route'
import '@polymer/app-route/app-location'
import '@polymer/app-storage/app-localstorage/app-localstorage-document'
import * as view from './template.pug'
import * as style from './style.css'
import '../login'
import '../home'
import '../404'
import IUser from 'site-api/user'

// TODO: use https://github.com/Polymer/polymer-decorators

export default class AppMain extends PolymerElement {

  private user: IUser | null = null
  private page: string | null = null

  private rootPath: string = '/'

  public static get properties() {
    return {
      user: {
        type: Object,
        observer: '_userChange',
        value: null,
      },
      page: {
        type: String,
        reflectToAttribute: true,
      },
    }
  }

  public static get template() {
    return html([`<style>${style}</style>${view()}`])
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ]
  }

  public _routePageChanged(page: string) {
    if (this.user === null) {
      this.setPage('login')
    } else if (page === 'login') {
      this.setPage('home')
    } else {
      this.setPage(page)
    }
  }

  private _userChange(user: string) {
    if (user === null) {
      this.setPage('login')
    } else if (this.page === 'login') {
      this.setPage('home')
    }
  }

  private setPage(page: string) {
    this.page = page
    // @ts-ignore
    window.history.pushState({}, null, '/' + page)
  }

}

window.customElements.define('app-main', AppMain)
