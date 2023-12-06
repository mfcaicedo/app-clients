import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../config/config';
import { Cliente } from '../interfaces/client.interface';
import { Region } from '../interfaces/region.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {

  constructor(private http: HttpClient) { }

  createCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${ENVIRONMENT.url_api_clientes}/clientes`, cliente); 
  }

  updateCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${ENVIRONMENT.url_api_clientes}/clientes/${cliente.id}`, cliente); 
  }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(`${ENVIRONMENT.url_api_clientes}/clientes/regiones`);
  }

}
