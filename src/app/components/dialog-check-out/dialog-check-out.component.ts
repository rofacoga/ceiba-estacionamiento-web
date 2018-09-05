import { Component, OnInit, Optional, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ParkingRecord } from '../main/main.component';
import { DataService } from '../../services/data.service';
// Sweet Alert
import swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-check-out',
  templateUrl: './dialog-check-out.component.html',
  styleUrls: ['./dialog-check-out.component.css']
})
export class DialogCheckOutComponent implements OnInit {
  myControl = new FormControl();
  lblTitulo = 'Salida de Vehículo';
  btnAceptar = 'Aceptar';
  btnCancelar = 'Cancelar';

  vehiculosParqueados: ParkingRecord[];
  vehiculosParqueadosFiltrados: Observable<ParkingRecord[]>;
  fechaSalida: string;

  constructor(
    private dataService: DataService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<DialogCheckOutComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

  ngOnInit() {
    this.fechaSalida = this.datePipe.transform(
      new Date(),
      'yyyy-MM-ddThh:mm:ss'
    );

    this.dataService.getData('keeper', 'allParkedVehicles').subscribe(
      data => {
        this.vehiculosParqueados = data as ParkingRecord[];
      },
      error => {
        this.vehiculosParqueados = [];
        console.log('error: ', error);
      }
    );

    this.vehiculosParqueadosFiltrados = this.myControl.valueChanges.pipe(
      startWith<string | ParkingRecord>(''),
      map(value => (typeof value === 'string' ? value : value.vehicle.plate)),
      map(name => (name ? this._filter(name) : this.vehiculosParqueados))
    );
  }

  displayFn(record?: ParkingRecord): string | undefined {
    return record ? record.vehicle.plate : undefined;
  }

  private _filter(name: string): ParkingRecord[] {
    const filterValue = name.toLowerCase();

    return this.vehiculosParqueados.filter(
      option => option.vehicle.plate.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onClickAceptar() {
    const record: ParkingRecord = this.myControl.value;

    if (record !== undefined) {
      record.checkOut = new Date(this.fechaSalida);
      this.dataService.postData('keeper', 'checkOut', record).subscribe(
        data => {
          console.log('success: ', data);
          const recordOk: ParkingRecord = data as ParkingRecord;
          const mensaje = 'El vehículo con placa ' + recordOk.vehicle.plate
            + ', estuvo estacionado por ' + recordOk.totalDays + ' días, ' + recordOk.totalHours
            + ' horas, y debe pagar <b>' + recordOk.totalCost + '</b>';

          this.dialogRef.close(
            swal('Salida Exitosa!', mensaje, 'success')
          );
        }, error => {
          console.log('error: ', error);
          swal('Ha ocurrido un problema!', error.error.message, 'error');
        }
      );
    }
  }

  onClickCancelar() {
    this.dialogRef.close();
  }
}
