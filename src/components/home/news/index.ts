import {
  PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
  property,
} from '@polymer/decorators'
import '@polymer/iron-icons'
import '@polymer/paper-listbox'
import '@polymer/paper-item'
import '@polymer/paper-item'
import '@polymer/paper-fab'
import '@polymer/paper-dialog'
import '@polymer/paper-dialog-scrollable'
import '@polymer/paper-input/paper-input'
import '@polymer/paper-input/paper-textarea'
import '@polymer/paper-toggle-button/paper-toggle-button'
import '@polymer/paper-toast/paper-toast'
import '@polymer/neon-animation/animations/scale-up-animation'
import '@polymer/neon-animation/animations/fade-out-animation'
import { PaperToastElement } from '@polymer/paper-toast/paper-toast'
import { PaperDialogElement } from '@polymer/paper-dialog'

import ApolloElement from 'utils/apollo'
import * as view from './template.pug'
import * as style from './style.css'
import { allNews, addNews } from 'api/news'
import INews from 'site-api/news'
import { IPagination } from 'site-api/base'

interface INewsQuery {
  all?: IPagination<INews>,
}

@customElement('app-news')
export default class AppNewsAdd extends ApolloElement(PolymerElement) {
  /*** All ***/
  @property({ type: Number })
  private offset: number = 0

  @property({ type: Number })
  private limit: number = 5

  @property({ type: Object, observer: AppNewsAdd.prototype.hasNews })
  private news: INewsQuery = {}

  @property({ type: Boolean })
  private hasNewsExist: boolean = false

  /*** Add ***/
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
    // @ts-ignore
    return html([`<style>${style}</style>${view()}`])
  }

  public normalizeDate = (datestamp: string): string =>
    new Date(Number(datestamp)).toLocaleString()

  public hasNews(news: INewsQuery) {
    if (!!news.all) this.hasNewsExist = news.all.count > 0
  }

  public get apollo() {
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

  public async addNews() {
    try {
      // @ts-ignore
      await this.$apollo.mutate({
        mutation: addNews,
        variables: {
          token: this.token,
          image: this.image,
          title: this.newsTitle,
          description: this.description,
          content: this.content,
          shareVK: this.shareVK,
        },
      })
      // @ts-ignore
      this.$apollo.refetch('allNews');
      (this.$.toast as PaperToastElement).show('Sucsess')
    } catch (error) {
      console.error(error);
      (this.$.toast as PaperToastElement).show('Error')
    }
  }

  public openAddNewsDialog() {
    (this.$.add as PaperDialogElement)!!.toggle()
  }
}
