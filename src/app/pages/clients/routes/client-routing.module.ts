import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateClientComponent } from "../create-client/create-client.component";
import { ListClientComponent } from "../list-client/list-client.component";

const routes: Routes = [
    { path: 'ver-clientes', component: ListClientComponent },
    { path: 'crear-cliente', component: CreateClientComponent },
    { path: 'editar-cliente', component: CreateClientComponent },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes), ],
    exports: [RouterModule]
})
export class ClientRoutingModule { }