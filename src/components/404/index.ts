import {
  PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
} from '@polymer/decorators'
import * as view from './template.pug'

@customElement('app-404')
export default class AppNotFound extends PolymerElement {
  public static get template() {
    // @ts-ignore
    return html([view()])
  }
}
