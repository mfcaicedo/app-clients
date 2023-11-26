import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private readonly fb: FormBuilder, 
    private router: Router,
    private readonly createServiceCliente: CreateClientService
    ) { }

  ngOnInit(): void {

    this.formGroupCliente = this.formGroupClienteInit();
  }

  formGroupClienteInit() {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log("values ", this.formGroupCliente.value);

    if(this.formGroupCliente.invalid){
      this.formGroupCliente.markAllAsTouched();
      return; 
    }

    this.requestCliente = {
      nombre: this.formGroupCliente.get('nombre')?.value,
      apellido: this.formGroupCliente.get('apellido')?.value,
      email: this.formGroupCliente.get('email')?.value,
      createAt: new Date(), 
    }

    this.createServiceCliente.createCliente(this.requestCliente).subscribe({
      next: (data)=>{
        console.log("data ", data);
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
      error: (error)=>{
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

}
