import {
  PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
  property,
  observe,
} from '@polymer/decorators'
import '@polymer/paper-button'

import ApolloElement from 'utils/apollo'
import * as view from './template.pug'
import * as style from './style.css'
import { allNews } from 'api/news'
import INews from 'site-api/news'
import './all'
import './add'

interface IRouteData {
  page?: string
}

@customElement('app-news')
export default class AppNews extends PolymerElement {

  @property({ type: Object })
  private routeData: IRouteData = {}

  @property({ type: String })
  private pageName: string = 'add'

  public static get template() {
    return html([`<style>${style}</style>${view()}`])
  }

  public selectPage() {
    const { page } = this.routeData
    this.set('pageName', page === 'all' ? 'all' :'add' )
    this.set('routeData.page', page === 'all' ? 'add' : 'all')
  }

  /**
   * Load main page
   * *
   * @param route
   */
  @observe('routeData')
  private routeChanged(route: IRouteData = {}) {
    if (route.page === '' || route.page === undefined) this.set('routeData.page', 'all')
  }
}
