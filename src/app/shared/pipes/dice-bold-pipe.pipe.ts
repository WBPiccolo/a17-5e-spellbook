import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { noop } from 'rxjs';

@Pipe({
  name: 'diceBoldPipe',
  standalone: true
})
export class DiceBoldPipePipe implements PipeTransform {
  
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, ...args: unknown[]): string {
    const regex = /((\d*)?d(\d+)([+-/*]\d+)?){1}/gi;
    return this.sanitize(this.replace(value, regex)) || value;
  }
  
  replace(str: string, regex: RegExp) {
    let matched = str.match(regex);
    matched
      ? matched.forEach((foundString) => {
          str = str.replace(regex, `<b>${foundString}</b>`);
        })
      : noop;
    return str;
  }

  sanitize(str: any) {
    return this.sanitizer.sanitize(SecurityContext.HTML, str);
  }
}
