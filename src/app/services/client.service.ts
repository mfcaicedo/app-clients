import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ENVIRONMENT } from '../config/config';
import { Cliente } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{

    return this.http.get<Cliente[]>(`${ENVIRONMENT.url_api_clientes}/clientes`);
    
  }

}
