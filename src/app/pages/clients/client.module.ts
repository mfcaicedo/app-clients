import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './routes/client-routing.module';
import { ListClientComponent } from './list-client/list-client.component';
import { CreateClientComponent } from './create-client/create-client.component';

@NgModule({
    declarations: [ ListClientComponent, CreateClientComponent
    ],
    imports: [
        ClientRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
    ],
})
export class ClientModule { }