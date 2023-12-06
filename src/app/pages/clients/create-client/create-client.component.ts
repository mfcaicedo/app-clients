import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/client.interface';
import { Region } from 'src/app/interfaces/region.interface';
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
  errorList: any[] = [];
  errorFlag: boolean = false;
  //Update 
  clienteUpdate!: Cliente;
  isUpdate: boolean = false;

  regiones: Region[] = [];

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
            region: params['region'],
          };
        }
      }
    })

    this.getRegiones(); 

    this.formGroupCliente = this.formGroupClienteInit();
    if (this.isUpdate) {
      this.formGroupCliente.patchValue({
        nombre: this.clienteUpdate.nombre,
        apellido: this.clienteUpdate.apellido,
        email: this.clienteUpdate.email,
        region: this.clienteUpdate.region,
      });
    }

  }

  formGroupClienteInit() {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
      apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.email]],
      region: ['', [Validators.required]],
    });
  }

  onSubmit() {

    // if (this.formGroupCliente.invalid) {
    //   this.formGroupCliente.markAllAsTouched();
    //   return;
    // }

    if (this.isUpdate) {
      this.updateCliente();
    } else {
      this.createCliente();
    }

  }

  updateCliente() {

    const region = this.regiones.find((region) => region.id == this.formGroupCliente.get('region')?.value)?.nombre;

    this.clienteUpdate.nombre = this.formGroupCliente.get('nombre')?.value;
    this.clienteUpdate.apellido = this.formGroupCliente.get('apellido')?.value;
    this.clienteUpdate.email = this.formGroupCliente.get('email')?.value;
    this.clienteUpdate.region = region == undefined ? null : {
      id: this.formGroupCliente.get('region')?.value,
      nombre: region || '',
    };
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

          this.errorList = [];
          this.errorList.push({
            nombre: error.error?.nombre,
            apellido: error.error?.apellido,
            email: error.error?.email,
            region: error.error?.region,
          })
          this.errorFlag = true;
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

    const region = this.regiones.find((region) => region.id == this.formGroupCliente.get('region')?.value)?.nombre;

    this.requestCliente = {
      nombre: this.formGroupCliente.get('nombre')?.value == '' ? null : this.formGroupCliente.get('nombre')?.value,
      apellido: this.formGroupCliente.get('apellido')?.value,
      email: this.formGroupCliente.get('email')?.value,
      createAt: new Date(),
      region: region == undefined ? null :
      {
        id: this.formGroupCliente.get('region')?.value,
        nombre: region || '',
      }
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
        console.log("errires", error);
        this.errorList = [];
        this.errorList.push({
          nombre: error.error?.nombre,
          apellido: error.error?.apellido,
          email: error.error?.email,
          region: error.error?.region,
        })
        this.errorFlag = true;
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

  getRegiones() {
    this.createServiceCliente.getRegiones().subscribe({
      next: (data) => {
        this.regiones  = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  regionEqual(region1: Region, region2: Region) {
    return region1 && region2 ? region1.id === region2.id : region1 === region2;
  }

  returnViewVerClientes() {
    this.router.navigate(['/clientes/ver-clientes']);
  }

}
