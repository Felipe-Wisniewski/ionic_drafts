import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title: string
  id_brand: any
  id_subdivision: any

  layout = "post"
  page = 1

  index = -1
  index_a = -1
  index_b = -1
  isSelected = false
  loaded = false

  subscription$: Subscription[] = []

  templatesPost: any[] = []
  templatesStoryOne: any[] = []
  templatesStory: any[] = []
  selectedTemplate: any

  slideOpts = {
    slidesPerView: 3
  }

  constructor(
    private homeService: HomeService) { }

  ngOnInit() {
    this.getBrandId()
  }

  getBrandId() {
    this.title = "templates"
    this.id_brand = "16"
    this.id_subdivision = null
    this.templatesPost.push(this.getTemplateBlanckPost())
    this.templatesStoryOne.push(this.getTemplateBlankStory())

    this.getTemplates()
  }

  getTemplates() {
    this.subscription$.push(this.homeService.getTemplates(this.id_brand, this.id_subdivision, 'post', this.page)
      .subscribe(_templates => {
        _templates.forEach(temp => {
          this.templatesPost.push(temp)
        })
        console.log('p', this.templatesPost)
        this.loaded = true
      })
    )

    this.subscription$.push(this.homeService.getTemplates(this.id_brand, this.id_subdivision, 'story', this.page)
      .subscribe((_templates) => {
        _templates.forEach(temp => {
          temp[0].id_group == null ? this.templatesStoryOne.push(temp[0]) : this.templatesStory.push(temp)
        })
        console.log('s', this.templatesStory)
        this.loaded = true
      }, (e) => {
        console.log(e)
      }, () => {
        this.templatesStory.unshift(this.templatesStoryOne)
      })
    )
  }

  selectPostStory() {
    switch (this.layout) {
      case "post": {
        // this.page = 1
        // this.templatesPost = []
        // this.id_subdivision == null ? this.templatesPost.push(this.getTemplateBlanckPost()) : this.templatesPost.push(this.getTemplateBlanckPostSubdvision())
        // this.index = -1
        this.layout = "post"
        // this.loaded = false
        this.isSelected = false
        // this.getTemplates()
        break
      }

      case "story": {
        // this.page = 1
        // this.templatesPost = []
        // this.templatesPost.push(this.getTemplateBlankStory())
        // this.index = -1
        this.layout = "story"
        // this.loaded = false
        this.isSelected = false
        // this.getTemplates()
        break
      }

      default: {
        break
      }
    }
  }

  selectTemplatePost(template, idx) {
    this.selectedTemplate = template

    if (this.index == idx) {
      this.index = -1
      this.isSelected = false

    } else {
      this.index = idx
      this.isSelected = true
    }
  }

  selectTemplateStory(template, index_a, index_b) {
    this.selectedTemplate = template

    if (this.index_a == index_a && this.index_b == index_b) {
      this.index_a = -1
      this.index_b = -1
      this.isSelected = false

    } else {
      this.index_a = index_a
      this.index_b = index_b
      this.isSelected = true
    }
  }

  openProducts() {
    /* if (this.isSelected) {
      this.db.setEditorStorage(editor.TEMPLATE, this.selectedTemplate).then(() => {
        this.router.navigate(['products'])
      })

    } else {
      this.templatesService.toast("Selecione um template !")
    } */
  }

  loadMore(iScroll) {
    setTimeout(() => {
      if (this.page < HomeService.pages) {
        this.page++
        this.getTemplates()
      }

      iScroll.target.complete()
    }, 3500)
  }

  getTemplateBlanckPost() {
    return {
      id_brand: this.id_brand,
      id_template: "0",
      json: null,
      name: "blank",
      thumbnail_url: "assets/img/templateWhitePost.png",
      id_subdivision: this.id_subdivision,
      max_products: "1",
      layout: "post"
    }
  }

  getTemplateBlanckPostSubdvision() {
    return {
      id_brand: this.id_brand,
      id_template: "0",
      json: null,
      name: "blank",
      thumbnail_url: "assets/img/templateWhitePost.png",
      id_subdivision: this.id_subdivision,
      max_products: "2",
      layout: "post"
    }
  }

  getTemplateBlankStory() {
    return {
      id_brand: this.id_brand,
      id_template: "0",
      id_group: null,
      json: null,
      name: "blank",
      thumbnail_url: "assets/img/templateWhiteStory.jpg",
      id_subdivision: this.id_subdivision,
      max_products: "2",
      layout: "story"
    }
  }

  loadErrorImg(event) {
    console.log('error image', event)
  }

  ngOnDestroy() {
    this.subscription$.forEach(s => s.unsubscribe())
  }
}
