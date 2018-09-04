import { Component, OnInit } from '@angular/core';
import { ParkingRecord } from '../main/main.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-record-history',
  templateUrl: './record-history.component.html',
  styleUrls: ['./record-history.component.css']
})
export class RecordHistoryComponent implements OnInit {
  tituloPagina = 'Historial de vehículos estacionados';
  columnasMostrar: string[] = ['placa', 'fechaIngreso'];
  historial: ParkingRecord[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData('keeper', 'allParkedVehicles').subscribe(
      data => {
        this.historial = data;
    });
  }

}
