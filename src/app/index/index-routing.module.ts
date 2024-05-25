import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';
import { IndexComponent } from './index.component';

const routes: Routes = [  {path: '', component: IndexComponent},
{
path: 'inicio-sesion', component: InicioSesionComponent
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
