import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DataService } from '../../services/data.service';
import { DialogCheckInComponent } from '../dialog-check-in/dialog-check-in.component';
import { Vehicle, VehicleTypeEnum } from '../vehicles/vehicles.component';
import { DialogCheckOutComponent } from '../dialog-check-out/dialog-check-out.component';

export interface ParkingRecord {
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
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['placa', 'fechaIngreso'];
  btnIngreso = 'Ingresar Vehículo';
  btnSalida = 'Retirar Vehículo';

  parked: ParkingRecord;
  listParked: ParkingRecord[] = [];

  constructor( private dataService: DataService, public dialog: MatDialog ) {}

  ngOnInit() {
    this.dataService.getData('keeper', 'allParkedVehicles').subscribe(
      data => {
        this.listParked = data;
        console.log(data);
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
