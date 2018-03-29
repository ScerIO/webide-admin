import {
  Element as PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
  property,
  observe,
} from '@polymer/decorators'
import '@polymer/iron-flex-layout/iron-flex-layout'
import '@polymer/iron-media-query/iron-media-query'
import '@polymer/iron-icons/iron-icons'
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout'
import '@polymer/app-layout/app-drawer/app-drawer'
import '@polymer/app-layout/app-toolbar/app-toolbar'
import '@polymer/app-layout/app-header-layout/app-header-layout'
import '@polymer/app-layout/app-header/app-header'
import '@polymer/app-layout/app-scroll-effects/effects/waterfall'
import '@polymer/paper-tabs/paper-tabs'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-item/paper-item'
import '@polymer/paper-styles/typography'
import * as view from './template.pug'
import * as style from './style.css'
import '../news'

@customElement('app-home')
export default class AppHome extends (PolymerElement as new () => Polymer.Element) {

  @property({ type: Array })
  private pages: string[] = [
    'News',
    'Notifications',
    'Chat',
  ]

  @property({ type: Object })
  private routeData: { page: string } = {
    page: '',
  }

  public static get template() {
    return html([`<style>${style}</style>${view()}`])
  }

  public _toLowerCase(text: string) {
    return text.toLowerCase()
  }

  /**
   * Load main page
   * *
   * @param page
   */
  @observe('routeData.page')
  private routePageChanged(page: string) {
    console.log(page)
    if (page === '' || page === undefined) this.set('routeData.page', 'news')
  }

}
