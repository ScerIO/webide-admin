import {
  PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
  property,
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
import '@polymer/paper-item/paper-icon-item'
import '@polymer/paper-item/paper-item-body'
import '@polymer/paper-fab/paper-fab'
import ApolloElement from 'utils/apollo'
import gql from 'graphql-tag'
import * as view from './template.pug'
import * as style from './style.css'
import { allNews } from 'api/news'
import INews from 'site-api/news'

@customElement('app-news')
export default class AppNews extends ApolloElement(PolymerElement) {

  @property({ type: Number })
  private offset: number = 0

  @property({ type: Number })
  private limit: number = 5

  @property({ type: Array })
  private news: INews[] = []

  public static get template() {
    return html([`<style>${style}</style>${view()}`])
  }

  get apollo() {
    return {
      allNews: {
        query: allNews({
          count: true,
          nodes: true,
          pageOnfo: true,
        }),
        variables: {
          offset: this.offset || 0,
          limit: this.limit || 5,
        },
      },
    }
  }

  public _normalizeDate(datestamp: string): string {
    return new Date(datestamp).toLocaleString()
  }
}
