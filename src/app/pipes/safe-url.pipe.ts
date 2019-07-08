import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'

@Pipe({
  name: 'safeURL'
})
export class SafeURLPipe implements PipeTransform {
  

  constructor(private sanitizer: DomSanitizer) {

  }

  transform(value: any, args?: any): any {
    console.log("inside sanitizePipe");
    return this.sanitizer.bypassSecurityTrustResourceUrl(value)
  }

}
