import { Pipe, PipeTransform } from '@angular/core';
import { ShoppingItem } from './models/shopping-item';

@Pipe({
  name: 'toDoOnly'
})
export class ToDoOnlyPipe implements PipeTransform {
  transform(items: ShoppingItem[], ...args: any[]): any {
    if (items) {
      return items.filter(shoppingItem => !shoppingItem.done);
    }
  }
}
