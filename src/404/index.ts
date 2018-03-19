import {
  Element as PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import * as view from './template.pug'

// TODO: use https://github.com/Polymer/polymer-decorators

export default class AppNotFound extends PolymerElement {

  public static get properties() {
    return {
    }
  }

  public static get template() {
    return html([view()])
  }

}

window.customElements.define('app-404', AppNotFound)
