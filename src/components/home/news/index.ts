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
import '@polymer/paper-input/paper-input'
import '@polymer/paper-input/paper-textarea'
import '@polymer/paper-fab/paper-fab'
import '@polymer/paper-toggle-button/paper-toggle-button'
import '@polymer/paper-dialog/paper-dialog'
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable'

import ApolloElement from 'utils/apollo'
import gql from 'graphql-tag'
import * as view from './template.pug'
import * as style from './style.css'
import { allNews, addNews } from 'api/news'
import INews from 'site-api/news'

@customElement('app-news')
export default class AppNews extends ApolloElement(PolymerElement) {

  @property({ type: Number })
  private offset: number = 0

  @property({ type: Number })
  private limit: number = 5

  @property({ type: Array })
  private news: INews[] = []

  @property({ type: String })
  private token: string = ''

  @property({ type: String })
  private image: string = ''

  @property({ type: String })
  private newsTitle: string = ''

  @property({ type: String })
  private description: string = ''

  @property({ type: String })
  private content: string = ''

  @property({ type: Boolean })
  private shareVK: boolean = false

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
    return new Date(Number(datestamp)).toLocaleString()
  }

  public addNewsDialog(): void {
    (this.$.addNewsDialog as any).open()
  }

  public async addNews(): Promise<INews> {
    // @ts-ignore
    const news: INews = (await this.$apollo.mutate({
      mutation: addNews,
      variables: {
        token: this.token,
        image: this.image,
        title: this.newsTitle,
        description: this.description,
        content: this.content,
        shareVK: this.shareVK,
      },
    })).data.news.add

    return news
  }
}
