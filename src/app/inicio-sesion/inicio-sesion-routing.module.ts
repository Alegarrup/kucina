import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion.component';
import { AppComponent } from '../app.component';
import { IndexComponent } from '../index/index.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [  {path: '', component: IndexComponent},
{
path: 'inicio-sesion', component: InicioSesionComponent
 }];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule]
})
export class InicioSesionRoutingModule { }
