import { VehicleType } from './vehicle-type.enum';

export class Vehicle {
  plate: string;
  cylinder: number;
  cylinderGreaterThan500: boolean;
  type: VehicleType;

  id: number;
  registrationActive: Boolean;
  registrationDate: Date;

  constructor() {}
}
