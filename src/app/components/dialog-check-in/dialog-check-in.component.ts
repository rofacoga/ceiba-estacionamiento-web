import { Component, OnInit, Inject, Optional } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../../services/data.service';
import { VehicleType } from '../../models/vehicle-type.enum';
import { Vehicle } from '../../models/vehicle';
import { ParkingRecord } from '../../models/parking-record';
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

  listTypes: VehicleType[];
  record: ParkingRecord;
  fechaIngreso: string;
  tipoVehiculo: string;
  cilindrajeMayor500: string;

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
    this.record.vehicle = new Vehicle();
    this.fechaIngreso = this.datePipe.transform(
      new Date(),
      'yyyy-MM-ddThh:mm:ss'
    );

    this.dataService.getData('vehicle', 'allTypesVehicles').subscribe(data => {
      this.listTypes = data as VehicleType[];
    });
  }

  onClickAceptar() {
    this.record.keeperIn = 1;
    this.record.checkIn = new Date(this.fechaIngreso);
    this.record.vehicle.type = this.tipoVehiculo;
    this.record.vehicle.cylinderGreaterThan500 =
      this.record.vehicle.cylinder === undefined ||
      this.record.vehicle.cylinder === null
        ? this.cilindrajeMayor500 === '1'
        : this.record.vehicle.cylinder > 500;

    this.dataService.postData('keeper', 'checkIn', this.record).subscribe(
      datos => {
        console.log('success: ', datos);
        swal('Registro exitoso!', '', 'success');
        this.dialogRef.close();
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
