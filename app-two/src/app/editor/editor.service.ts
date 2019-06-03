import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { empty } from 'rxjs';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  url = `${environment.URL_API}` 

  constructor(private http: HttpClient) { }

  getTemplate(id_template) {
    return this.http.get(`${this.url}templates/${id_template}`)
      .pipe(
        catchError(() => {
          return empty()
        }),
        map(temp => temp['template'])
      )
  }

  setCanvasDimensions(layout) {
    let header = document.getElementsByTagName('ion-header').item(0).clientHeight
    let footer = document.getElementsByTagName('ion-footer').item(0).clientHeight
    let widthScreen = parent.innerWidth
    let heightScreen = parent.innerHeight - (header + footer)

    let width = 0
    let height = 0

    if (layout == 'post') {
      if (widthScreen > heightScreen) {
        width = heightScreen
        height = heightScreen
      } else {
        width = widthScreen
        height = widthScreen
      }
    }

    if (layout == 'story') {
      width = (1080 / 1920) * heightScreen
      height = heightScreen
    }

    return new fabric.Canvas('canvas').setDimensions({ width: width, height: height })
  }
}
