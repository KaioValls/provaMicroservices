import { Routes } from '@angular/router';
import { HomeComponentComponent } from './components/home/home-component';
import { FornecedorComponent } from './components/fornecedor/fornecedor.component';

export const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'fornecedores', component: FornecedorComponent },
  { path: '**', component: HomeComponentComponent },
];
