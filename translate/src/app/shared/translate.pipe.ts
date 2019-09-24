import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'appTranslate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

  transform(value: any, ...args: any[]): any {
    let r 

    console.log(value)

    this.translate.get(value).subscribe((it) => {
      console.log(it)
      r = it
    })
    
    return r
  }

}
