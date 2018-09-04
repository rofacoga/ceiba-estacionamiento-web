import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public urlConnect = 'http://localhost:8080/';
  public headersPost = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(private httpClient: HttpClient) {}

  getData(dependency: string, method: string) {
    const url = this.urlConnect + dependency + '/' + method;
    return this.httpClient.get(url);
  }

  postData(dependency: string, method: string, parameters: {}) {
    const url = this.urlConnect + dependency + '/' + method;
    return this.httpClient.post(url, parameters, { headers: this.headersPost });
  }
}
