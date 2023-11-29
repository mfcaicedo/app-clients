import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/client.interface';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent {

  listClientes: Cliente[] = [];

  constructor(private readonly clienteService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getClientes();

  }

  getClientes() {

    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.listClientes = data;
      },
      error: (error) => {
        console.log(error);
      }
    })

  }

  viewUpdateCliente(cliente: any) {
    this.router.navigate(['/clientes/editar-cliente', cliente]);
  }

  deleteCliente(idCliente: any) {

    Swal.fire({
      title: '¿Estas seguro de eliminar el cliente?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.deleteCliente(idCliente).subscribe({
          next: (data) => {
            this.getClientes();
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    })
  }

}
