import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataService } from '../../services/data.service';
import { DialogCheckInComponent } from '../dialog-check-in/dialog-check-in.component';
import { Vehicle } from '../vehicles/vehicles.component';
import { DialogCheckOutComponent } from '../dialog-check-out/dialog-check-out.component';

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

  displayedColumns: string[] = ['placa', 'tipoVehiculo', 'fechaIngreso'];
  btnIngreso = 'Ingresar Vehículo';
  btnSalida = 'Retirar Vehículo';

  parked: ParkingRecord;
  listParked: ParkingRecord[] = [];

  constructor( private dataService: DataService, public dialog: MatDialog ) {}

  ngOnInit() {
    this.dataService.getData('keeper', 'allParkedVehicles').subscribe(
      data => {
        this.listParked = data as ParkingRecord[];
    },
    error => {
      console.log('error', error);
  });
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
}
