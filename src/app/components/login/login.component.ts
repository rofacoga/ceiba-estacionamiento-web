import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titlePage = 'Estacionamiento Ceiba';
  subtitlePage = 'Inicio de Sesión';
  lblUser = 'Usuario';
  lblPass = 'Contraseña';
  hidePass = true;
  btnLogin = 'Iniciar Sesión';

  rForm: FormGroup;
  user: string;
  pass: string;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.rForm = fb.group({
      user: [null, Validators.required],
      pass: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32)
        ])
      ]
    });
  }

  ngOnInit() {}

  signIn(user, pass) {
    console.log(user, pass);

    this.dataService.getData('keeper', 'login').subscribe(data => {
      console.log(data);
    });
    return false;
  }
}
