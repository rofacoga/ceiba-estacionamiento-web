import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  lblTitle = 'Estacionamiento Ceiba';
  lblHome = 'Inicio';
  lblHistory = 'Historial';
  lblVehicles = 'Vehiculos';
  lblLogout = 'Cerrar Sesión';

  constructor() { }

  ngOnInit() {
  }

}
