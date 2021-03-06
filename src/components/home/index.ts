import {
  PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
  property,
} from '@polymer/decorators'
import '@polymer/iron-flex-layout/iron-flex-layout'
import '@polymer/iron-media-query'
import '@polymer/iron-icons'
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout'
import '@polymer/app-layout/app-drawer/app-drawer'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/app-layout/app-header-layout/app-header-layout'
import '@polymer/app-layout/app-header/app-header'
import '@polymer/app-layout/app-scroll-effects/effects/waterfall'
import '@polymer/paper-tabs'
import '@polymer/paper-tabs'
import '@polymer/paper-icon-button'
import '@polymer/paper-listbox'
import '@polymer/paper-item'
import '@polymer/paper-styles/typography'
import * as view from './template.pug'
import * as style from './style.css'
import './news'

interface IRouteData {
  page?: string
}

@customElement('app-home')
export default class AppHome extends PolymerElement {
  @property({ type: Array })
  private pages: string[] = [
    'News',
    'Notifications',
    'Chat',
  ]

  @property({ type: Object, observer: AppHome.prototype.routeChanged })
  private routeData: IRouteData = {}

  public static get template() {
    // @ts-ignore
    return html([`<style>${style}</style>${view()}`])
  }

  public toLowerCase = (text: string): string => text.toLowerCase()

  /**
   * Load main page
   * *
   * @param route
   */
  private routeChanged(route: IRouteData = {}) {
    if (!('page' in route)) return
    const { page } = route
    console.log(`Page -> ${page}`)
    if (page === '' || page === undefined) this.set('routeData.page', 'news')
  }
}
