import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule, 
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: 'clientes',
          loadChildren: () => import('./pages/clients/client.module').then(m => m.ClientModule)
        }, 

        {
          path: '', 
          component: HomeComponent
        }, 
        {
          path: '',
          pathMatch: 'full',
          redirectTo: ''
      }, 
      ]
    )
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
