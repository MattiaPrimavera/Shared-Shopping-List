import { Pipe, PipeTransform } from '@angular/core';
import { ShoppingItem } from './models/shopping-item';

@Pipe({
  name: 'doneOnly'
})
export class DoneOnlyPipe implements PipeTransform {
  transform(items: ShoppingItem[], ...args: any[]): any {
    if (items) {
      return items.filter(shoppingItem => shoppingItem.done);
    }
  }
}
