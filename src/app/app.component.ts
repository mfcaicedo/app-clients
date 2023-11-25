import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-cliente-navbar></app-cliente-navbar>
  <router-outlet></router-outlet>
  <app-cliente-footer></app-cliente-footer>`
})
export class AppComponent {
  title = 'app-clients';
}
