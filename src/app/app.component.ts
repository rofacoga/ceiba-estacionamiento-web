import { Component } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoged = true;
  constructor() {

  }
}
