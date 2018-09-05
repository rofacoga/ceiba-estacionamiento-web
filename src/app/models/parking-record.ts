import { Vehicle } from './vehicle';

export class ParkingRecord {
  keeperIn: number;
  keeperOut: number;
  vehicle: Vehicle;
  checkIn: Date;
  checkOut: Date;
  totalDays: number;
  totalHours: number;
  totalCost: number;

  id: number;
  registrationActive: Boolean;
  registrationDate: Date;

  constructor() {
    this.vehicle = new Vehicle();
  }
}
