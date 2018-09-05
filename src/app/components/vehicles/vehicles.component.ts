import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Vehicle } from '../../models/vehicle';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  tituloPagina = 'Vehículos registrados';
  columnasMostrar: string[] = ['placa', 'tipoVehiculo', 'cilindraje', 'cilindraje500', 'registradoDesde'];
  vehiculos: Vehicle[] = [];
  dataSource = new MatTableDataSource();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData('vehicle', 'allVehicles').subscribe(
      data => {
        this.vehiculos = data as Vehicle[];
        this.dataSource = new MatTableDataSource(this.vehiculos);
      },
      error => {
        console.log('error', error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
