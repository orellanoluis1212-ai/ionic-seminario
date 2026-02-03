import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroPage } from './pages/registro-articulo/registro-articulo.page';
import { ListadoPage } from './pages/listado-articulo/listado-articulo.page';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { ListadoUsuarioComponent } from './pages/listado-usuario/listado-usuario.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'registro-usuario',
    component: RegistroUsuarioComponent
  },
  {
    path: 'listado-usuario',
    component: ListadoUsuarioComponent
  },
   {
    path: 'registro-articulo',
    component: RegistroPage
  },
  {
    path: 'listado-articulo',
    component: ListadoPage
  },
  {
    path: 'qwen',
    loadComponent: () => import('./pages/qwen/qwen.page').then( m => m.QwenPage)
  },
  {
    path: 'rm-graphql',
    loadComponent: () => import('./pages/rm-graphql/rm-graphql.page').then( m => m.RmGraphqlPage)
  },
  {
    path: 'rm-episodios',
    loadComponent: () => import('./pages/rm-episodios/rm-episodios.page').then( m => m.RmEpisodiosPage)
  },
  {
    path: 'permisos-cam-y-mic',
    loadComponent: () => import('./pages/permisos-cam-y-mic/permisos-cam-y-mic.page').then( m => m.PermisosCAMYMICPage)
  },

];