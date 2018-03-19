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
import ApolloElement from 'utils/apollo'
import gql from 'graphql-tag'
import * as view from './template.pug'
import * as style from './style.css'
import { allNews } from 'api/news'
import INews from 'site-api/news'

// TODO: use https://github.com/Polymer/polymer-decorators

export default class AppNews extends ApolloElement(PolymerElement) {

  private offset: number = 0
  private limit: number = 5

  private news: INews[] | null = null

  public static get properties() {
    return {
      route: {
        type: Object,
        notify: true,
      },
      query1: {
        type: Object,
      },
    }
  }

  public test(test: any) {
    console.log(test)
  }

  public static get template() {
    return html([`<style>${style}</style>${view()}`])
  }

  get apollo() {
    return {
      query1: {
        query: allNews({
          count: true,
          nodes: true,
          pageOnfo: true,
        }),
        variables: {
          offset: this.offset || 0,
          limit: this.limit || 5,
        },
        success: ({ data }) => {
          this.news = data.news.all
          console.log(this.news)
        },
      },
    }
  }
}

window.customElements.define('app-news', AppNews)
