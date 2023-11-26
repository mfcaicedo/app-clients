import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../config/config';
import { Cliente } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class CreateClientService {

  constructor(private http: HttpClient) { }

  createCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${ENVIRONMENT.url_api_clientes}/clientes`, cliente); 
  }
}
