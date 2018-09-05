import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ParkingRecord } from '../../models/parking-record';
import { DataService } from '../../services/data.service';
import { DialogCheckInComponent } from '../dialog-check-in/dialog-check-in.component';
import { DialogCheckOutComponent } from '../dialog-check-out/dialog-check-out.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public idVigilante = 1;

  displayedColumns: string[] = ['placa', 'tipoVehiculo', 'fechaIngreso', 'retiraVehiculo'];
  dataSource = new MatTableDataSource();

  btnIngreso = 'Ingresar Vehículo';
  btnSalida = 'Retirar Vehículo';

  parked: ParkingRecord;
  listParked: ParkingRecord[] = [];

  constructor( private dataService: DataService, public dialog: MatDialog ) {}

  ngOnInit() {
    this.listarVehiculos();
  }

  listarVehiculos(): void {
    this.dataService.getData('keeper', 'allParkedVehicles').subscribe(
      data => {
        this.listParked = data as ParkingRecord[];
        this.dataSource = new MatTableDataSource(this.listParked);
      },
      error => {
        console.log('error', error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogCheckIn(): void {
    const dialogRef = this.dialog.open( DialogCheckInComponent, {
      width: 'auto',
      data: this.parked
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog out was closed', result);
      this.listarVehiculos();
      this.parked = result;
    });
  }

  openDialogCheckOut(): void {
    const dialogRef = this.dialog.open( DialogCheckOutComponent, {
      width: 'auto',
      data: this.parked
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog out was closed', result);
      this.mostrarMensajePago(result);
    });
  }

  retirarVehiculo(record: ParkingRecord): void {
    console.log('entre');

    record.keeperOut = 1;
    record.checkOut = new Date();

    this.dataService.postData('keeper', 'checkOut', record).subscribe(
      data => {
        console.log('success: ', data);
        const recordOk: ParkingRecord = data as ParkingRecord;
        this.mostrarMensajePago(recordOk);

      }, error => {
        console.log('error: ', error);
        swal('Ha ocurrido un problema!', error.error.message, 'error');
      }
    );
  }

  mostrarMensajePago(recordOk: ParkingRecord): void {
    const mensaje = 'El vehículo con placa <b>' + recordOk.vehicle.plate + '</b>'
      + ', <br>estuvo estacionado por: <br>' + recordOk.totalDays + ' días, <br>' + recordOk.totalHours
      + ' horas, <br>debe pagar <b>$ ' + recordOk.totalCost + '</b>';

    this.listarVehiculos();
    swal('Salida Exitosa!', mensaje, 'success');
  }
}
