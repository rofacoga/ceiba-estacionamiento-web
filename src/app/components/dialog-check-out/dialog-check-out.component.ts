import { Component, OnInit } from '@angular/core';
import { ParkingRecord } from '../main/main.component';

@Component({
  selector: 'app-dialog-check-out',
  templateUrl: './dialog-check-out.component.html',
  styleUrls: ['./dialog-check-out.component.css']
})
export class DialogCheckOutComponent implements OnInit {
  lblTitulo = 'Ingreso de Vehículo';
  btnAceptar = 'Aceptar';
  btnCancelar = 'Cancelar';

  record: ParkingRecord;
  fechaIngreso: Date = new Date();
  placa: string;

  constructor() {}

  ngOnInit() {}

  onClickCancelar() {
    this.dialogRef.close();
  }
}
