import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/client.interface';
import { CreateClientService } from 'src/app/services/create-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {
  formGroupCliente!: FormGroup;
  requestCliente!: Cliente;
  //Update 
  clienteUpdate!: Cliente;
  isUpdate: boolean = false;

  constructor(private readonly fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private readonly createServiceCliente: CreateClientService
  ) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.isUpdate = true;
          this.clienteUpdate = {
            id: params['id'],
            nombre: params['nombre'],
            apellido: params['apellido'],
            email: params['email'],
            createAt: params['createAt'],
          };
        }
      }
    })

    this.formGroupCliente = this.formGroupClienteInit();

    if (this.isUpdate) {
      this.formGroupCliente.patchValue({
        nombre: this.clienteUpdate.nombre,
        apellido: this.clienteUpdate.apellido,
        email: this.clienteUpdate.email,
      });
    }

  }

  formGroupClienteInit() {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {

    if (this.formGroupCliente.invalid) {
      this.formGroupCliente.markAllAsTouched();
      return;
    }

    if (this.isUpdate) {
      this.updateCliente();
    } else {
      this.createCliente();
    }

  }

  updateCliente() {

    this.clienteUpdate.nombre = this.formGroupCliente.get('nombre')?.value;
    this.clienteUpdate.apellido = this.formGroupCliente.get('apellido')?.value;
    this.clienteUpdate.email = this.formGroupCliente.get('email')?.value;

    this.createServiceCliente.updateCliente(this.clienteUpdate).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cliente actualizado',
          text: `Cliente ${data.nombre} actualizado con éxito`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
        setTimeout(() => {
          this.router.navigate(['/clientes/ver-clientes']);
        }, 1600);
      },
      error: (error) => {
        console.log("error ", error);
        Swal.fire({
          title: 'Error',
          text: 'Error al actualizar el cliente, revisa los datos e intenta de nuevamente',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          timer: 1500,
        })
      }
    })
  }

  createCliente() {

    this.requestCliente = {
      nombre: this.formGroupCliente.get('nombre')?.value,
      apellido: this.formGroupCliente.get('apellido')?.value,
      email: this.formGroupCliente.get('email')?.value,
      createAt: new Date(),
    }

    this.createServiceCliente.createCliente(this.requestCliente).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Cliente creado',
          text: `Cliente ${data.nombre} creado con éxito`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
        setTimeout(() => {
          this.router.navigate(['/clientes/ver-clientes']);
        }, 1600);
      },
      error: (error) => {
        console.log("error ", error);
        Swal.fire({
          title: 'Error',
          text: 'Error al crear el cliente, revisa los datos e intenta de nuevamente',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          timer: 1500,
        })
      }
    });

  }

  returnViewVerClientes() {
    this.router.navigate(['/clientes/ver-clientes']);
  }


}
