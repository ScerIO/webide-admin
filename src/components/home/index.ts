import {
  Element as PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
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
import * as view from './template.pug'
import * as style from './style.css'
import '../news'

// TODO: use https://github.com/Polymer/polymer-decorators

export default class AppHome extends PolymerElement {

  public static get properties() {
    return {
      route: {
        type: Object,
        notify: true,
      },
      sections: {
        type: Array,
        value: [
          'News',
          'Notifications',
          'Chat',
        ],
      },
    }
  }

  public _toLowerCase(text: string) {
    return text.toLowerCase()
  }

  public static get template() {
    return html([`<style>${style}</style>${view()}`])
  }
}

window.customElements.define('app-home', AppHome)
