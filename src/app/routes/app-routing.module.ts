import { Route } from "@angular/router";

export const AppRoutes: Route[] = [
  {
    path: 'clientes', 
    loadChildren: () => import('../pages/clients/client.module').then(m => m.ClientModule)
  }
]
