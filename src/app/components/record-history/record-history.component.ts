import { Component, OnInit } from '@angular/core';
import { ParkingRecord } from '../../models/parking-record';
import { DataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-record-history',
  templateUrl: './record-history.component.html',
  styleUrls: ['./record-history.component.css']
})
export class RecordHistoryComponent implements OnInit {
  dataSource = new MatTableDataSource();
  historial: ParkingRecord[] = [];
  tituloPagina = 'Historial de vehículos estacionados';
  columnasMostrar: string[] = [
    'placa',
    'tipoVehiculo',
    'fechaIngreso',
    'fechaSalida',
    'totalDias',
    'totalHoras',
    'totalCosto'
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData('keeper', 'parkedVehiclesHistory').subscribe(
      data => {
        this.historial = data as ParkingRecord[];
        this.dataSource = new MatTableDataSource(this.historial);
      },
      error => {
        console.log('error', error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
