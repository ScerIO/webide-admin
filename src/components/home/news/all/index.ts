import {
  PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
  property,
} from '@polymer/decorators'
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-item/paper-icon-item'
import '@polymer/paper-item/paper-item-body'

import ApolloElement from 'utils/apollo'
import * as view from './template.pug'
import * as style from './style.css'
import { allNews } from 'api/news'
import INews from 'site-api/news'

@customElement('app-news-all')
export default class AppNewsAdd extends ApolloElement(PolymerElement) {

  @property({ type: Number })
  private offset: number = 0

  @property({ type: Number })
  private limit: number = 5

  @property({ type: Array })
  private news: INews[] = []

  public static get template() {
    return html([`<style>${style}</style>${view()}`])
  }

  public _normalizeDate(datestamp: string): string {
    return new Date(Number(datestamp)).toLocaleString()
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
}
