import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {
  transform(value: 'available' | 'sold'): string {
    const statusMap: Record<'available' | 'sold', string> = {
      available: 'Available',
      sold: 'Sold'
    };
    return statusMap[value] || value;
  }
}