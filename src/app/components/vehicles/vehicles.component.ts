import { Component, OnInit } from '@angular/core';

export enum VehicleTypeEnum {
  MOTORCYCLE= 0,
  VEHICLE = 1
}

export interface Vehicle {
  plate: string;
  cylinder: number;
  cylinderGreaterThan500: boolean;
  type: VehicleTypeEnum;

  id: number;
  registrationActive: Boolean;
  registrationDate: Date;
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
