import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

// Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialConfigModule } from './material.config';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RecordHistoryComponent } from './components/record-history/record-history.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { DialogCheckInComponent } from './components/dialog-check-in/dialog-check-in.component';
import { DialogCheckOutComponent } from './components/dialog-check-out/dialog-check-out.component';

const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  {path: 'history', component: RecordHistoryComponent},
  {path: 'vehicles', component: VehiclesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    NavigationComponent,
    RecordHistoryComponent,
    VehiclesComponent,
    DialogCheckInComponent,
    DialogCheckOutComponent
  ],
  entryComponents: [
    DialogCheckInComponent,
    DialogCheckOutComponent
  ],
  exports: [
    DialogCheckInComponent,
    DialogCheckOutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialConfigModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule {  }
