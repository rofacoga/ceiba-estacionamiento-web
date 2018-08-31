import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titlePage = 'Estacionamiento Ceiba';
  lblUser = 'Usuario';
  lblPass = 'Contraseña';
  btnLogin = 'Iniciar Sesión';

  rForm: FormGroup;
  user: string = '';
  pass: string = '';

  constructor(private fb: FormBuilder) {
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
}
