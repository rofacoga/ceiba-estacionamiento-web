import { Component, OnInit, Inject, Optional } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParkingRecord } from '../main/main.component';
import { DataService } from '../../services/data.service';
import { VehicleTypeEnum } from '../vehicles/vehicles.component';
import swal from 'sweetalert2';

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
  fechaIngreso: string;
  placa: string;
  tipoVehiculo: string;
  cilindrajeMayor500: string;
  cilindraje: number;

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<DialogCheckInComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit() {
    this.record = new ParkingRecord();
    this.fechaIngreso = this.datePipe.transform(
      new Date(),
      'yyyy-MM-ddThh:mm:ss'
    );

    this.dataService.getData('vehicle', 'allTypesVehicles').subscribe(data => {
      this.listTypes = data as VehicleTypeEnum[];
    });
  }

  validarCilindraje(ku) {
    console.log(this.cilindraje);
    console.log(ku);
  }

  onClickAceptar() {
    this.record.keeperIn = 1;
    this.record.checkIn = new Date(this.fechaIngreso);
    this.record.vehicle.plate = this.placa;
    this.record.vehicle.type = this.tipoVehiculo;
    this.record.vehicle.cylinder = this.cilindraje;
    this.record.vehicle.cylinderGreaterThan500 =
      ( this.cilindraje === undefined || this.cilindraje === null ) ? (this.cilindrajeMayor500 === '1') : (this.cilindraje > 500);

    this.dataService.postData('keeper', 'checkIn', this.record).subscribe(
      datos => {
        console.log('success: ', datos);
        this.dialogRef.close(
          swal('Registro exitoso!', null, 'success')
        );
      },
      error => {
        console.log('errors: ', error);
        swal('Ha ocurrido un problema!', error.error.message, 'error');
      }
    );
  }

  onClickCancelar() {
    this.dialogRef.close();
  }
}
