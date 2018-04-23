import {
  PolymerElement,
  html,
} from '@polymer/polymer/polymer-element'
import {
  customElement,
  property,
} from '@polymer/decorators'
import '@polymer/paper-input/paper-input'
import '@polymer/paper-input/paper-textarea'
import '@polymer/paper-toggle-button/paper-toggle-button'

import ApolloElement from 'utils/apollo'
import * as view from './template.pug'
import * as style from './style.css'
import { addNews } from 'api/news'
import INews from 'site-api/news'

@customElement('app-news-add')
export default class AppNewsAdd extends ApolloElement(PolymerElement) {

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
