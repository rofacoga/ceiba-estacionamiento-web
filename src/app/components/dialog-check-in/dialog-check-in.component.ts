import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParkingRecord } from '../main/main.component';
import { DataService } from '../../services/data.service';
import { VehicleTypeEnum } from '../vehicles/vehicles.component';

@Component({
  selector: 'app-dialog-check-in',
  templateUrl: './dialog-check-in.component.html',
  styleUrls: ['./dialog-check-in.component.css']
})
export class DialogCheckInComponent implements OnInit {
  lblTitulo = 'Ingreso de Vehículo';
  btnAceptar = 'Aceptar';
  btnCancelar = 'Cancelar';

  listTypes: VehicleTypeEnum[];
  record: ParkingRecord;
  fechaIngreso: Date = new Date();
  placa: string;
  tipoVehiculo: VehicleTypeEnum;
  cilindrajeMayor500: Boolean;
  cilindraje: number;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<DialogCheckInComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    this.fechaIngreso = this.fechaIngreso.getFullYear() + '-' +
      ('0' + (this.fechaIngreso.getMonth() + 1)).slice(-2) + '-' +
      ('0' + this.fechaIngreso.getDate()).slice(-2) + 'T' + this.fechaIngreso.getHours() + ':' +
      this.fechaIngreso.getMinutes();

      this.dataService.getData('vehicle', 'allTypesVehicles').subscribe(data => {
      this.listTypes = data;
    });
  }

  ngOnInit() {}

  validarCilindraje(ku) {
    console.log(this.cilindraje);
    console.log(ku);
  }

  onClickAceptar() {
    console.log('pase por aqui');

    console.log(this.record);
    console.log(this.fechaIngreso);
    console.log(this.placa);
    console.log(this.tipoVehiculo);
    console.log(this.cilindraje);
    console.log(this.cilindrajeMayor500);
  }

  onClickCancelar() {
    this.dialogRef.close();
  }
}
