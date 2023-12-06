import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ENVIRONMENT } from '../config/config';
import { Cliente } from '../interfaces/client.interface';
import { Region } from '../interfaces/region.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{

    return this.http.get<Cliente[]>(`${ENVIRONMENT.url_api_clientes}/clientes`);
    
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${ENVIRONMENT.url_api_clientes}/clientes/${id}`);
  }

  deleteCliente(id: number): Observable<any>{
    return this.http.delete<any>(`${ENVIRONMENT.url_api_clientes}/clientes/${id}`);
  }

  getRegiones(): Observable<Region>{
    return this.http.get<Region>(`${ENVIRONMENT.url_api_clientes}/clientes/regiones`);
  }

}
