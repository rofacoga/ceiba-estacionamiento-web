import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DataService } from '../../services/data.service';
import { DialogCheckInComponent } from '../dialog-check-in/dialog-check-in.component';
import { Vehicle } from '../vehicles/vehicles.component';
import { DialogCheckOutComponent } from '../dialog-check-out/dialog-check-out.component';
import swal from 'sweetalert2';

export class ParkingRecord {
  keeperIn: number;
  keeperOut: number;
  vehicle: Vehicle;
  checkIn: Date;
  checkOut: Date;
  totalDays: number;
  totalHours: number;
  totalCost: number;

  id: number;
  registrationActive: Boolean;
  registrationDate: Date;

  constructor() {
    this.vehicle = new Vehicle();
  }
}

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
      console.log('The dialog in was closed');
      this.parked = result;
    });
  }

  openDialogCheckOut(): void {
    const dialogRef = this.dialog.open( DialogCheckOutComponent, {
      width: 'auto',
      data: this.parked
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog out was closed');
      this.parked = result;
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
        const mensaje = 'El vehículo con placa ' + recordOk.vehicle.plate
          + ', estuvo estacionado por ' + recordOk.totalDays + ' días, ' + recordOk.totalHours
          + ' horas, y debe pagar <b>' + recordOk.totalCost + '</b>';

        swal('Salida Exitosa!', mensaje, 'success');
      }, error => {
        console.log('error: ', error);
        swal('Ha ocurrido un problema!', error.error.message, 'error');
      }
    );
  }
}
