import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent {

  listClientes: Cliente[] = []; 

  constructor(private readonly clienteService: ClientService) {}

  ngOnInit(): void {

    this.clienteService.getClientes().subscribe({
      next: (data) => {
        console.log("data ", data);
        this.listClientes = data; 
      }, 
      error: (error) => {
        console.log(error);
      }

    })

  }

}
