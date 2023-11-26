import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent {

  listClientes: Cliente[] = []; 

  constructor(private readonly clienteService: ClientService, 
    private router: Router
    ) {}

  ngOnInit(): void {

    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.listClientes = data; 
      }, 
      error: (error) => {
        console.log(error);
      }

    })

  }

  viewUpdateCliente(cliente: any){
    console.log("cliente ", cliente);
    this.router.navigate(['/clientes/editar-cliente', cliente]);
  }

}
