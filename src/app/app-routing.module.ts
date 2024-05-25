import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { IndexComponent } from './index/index.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {
  path: 'inicio-sesion', component: InicioSesionComponent
   },
   {
    path: 'empresa', component: EmpresaComponent
   },
   {
    path: 'catalogo', component: CatalogoComponent
   },
   {
    path: 'carrito', component: CarritoComponent,
    canActivate: [AuthGuard],
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),[RouterOutlet]],
  exports: [RouterModule]
})
export class AppRoutingModule { }
