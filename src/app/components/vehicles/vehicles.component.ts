import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

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
  tituloPagina = 'Historial de vehículos estacionados';
  columnasMostrar: string[] = ['placa', 'tipoVehiculo', 'cilindraje', 'cilindraje500'];
  vehiculos: Vehicle[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData('vehicle', 'allVehicles').subscribe(
      data => {
        this.vehiculos = data;
        console.log(data);
    });
  }
}
