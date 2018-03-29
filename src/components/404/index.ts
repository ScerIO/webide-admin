import {
  Element as PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
  property,
} from '@polymer/decorators'
import * as view from './template.pug'

@customElement('app-404')
export default class AppNotFound extends (PolymerElement as new () => Polymer.Element) {

  public static get template() {
    return html([view()])
  }

}
