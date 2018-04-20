import {
  PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
  property,
  observe,
  computed,
} from '@polymer/decorators'
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

@customElement('app-main')
export default class AppMain extends (PolymerElement as new () => Polymer.Element) {

  @property({ type: Object })
  private user: IUser | null = null

  @property({ type: Object })
  private routeData: { page: string | null } = {
    page: null,
  }

  /**
   * Template
   */
  public static get template() {
    return html([`<style>${style}</style>${view()}`])
  }

  /**
   * Load main page
   * *
   * @param page
   * @param user
   */
  @observe('routeData.page, user')
  private router(page: string, user: string) {
    if (user === null) this.set('routeData.page', 'login')
    else if (page === 'login' || page === '') this.set('routeData.page', 'home')
  }

  /**
   * Fix path
   * TODO: Remove on resolve my pr with add flag 'auto-activate' in home router
   * *
   * @param path
   */
  @observe('homeSubroute.path')
  private routePathChanged(path: string) {
    if (path === '') this.set('homeSubroute.path', '/')
  }
}
