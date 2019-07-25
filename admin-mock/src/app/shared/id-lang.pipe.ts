import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idLang'
})
export class IdLangPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let languages = { '1': 'English', '2': 'Espãnol', '3': 'Português' }
    let lang = ''

    Object.keys(languages).forEach((key) => {
      if (key == value) lang = languages[key]
    })
    
    return lang
  }
}