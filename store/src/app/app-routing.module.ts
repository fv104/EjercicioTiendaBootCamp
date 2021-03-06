import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';

const routes: Routes = [
  {path: 'estudiantes',component : EstudiantesComponent},
  {path:'empleados',component : EmpleadosComponent},
  { path: 'productos', loadChildren: () => import('./components/productos/productos.module').then(m => m.ProductosModule) },
  {path: '**', redirectTo: '',pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
