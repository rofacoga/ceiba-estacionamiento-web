import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehicleType'
})
export class VehicleTypePipe implements PipeTransform {
  transform(value: string): any {
    let message = '';
    switch (value) {
      case 'MOTORCYCLE':
        message = 'Motocicleta';
        break;
      case 'CAR':
        message = 'Vehículo';
        break;
      default:
        message = 'O.O';
        break;
    }
    return message;
  }
}
