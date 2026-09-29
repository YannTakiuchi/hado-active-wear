import { Routes } from '@angular/router';
import { VitrineComponent } from './pages/vitrine/vitrine';
import { DetalheComponent } from './pages/detalhe/detalhe';
import { BuscaComponent } from './pages/busca/busca';
import { CestaComponent } from './pages/cesta/cesta';
import { LoginComponent } from './pages/login/login';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { EsqueciComponent } from './pages/esqueci/esqueci';

export const routes: Routes = [
  { path: '', component: VitrineComponent },
  { path: 'produto/:id', component: DetalheComponent },
  { path: 'busca', component: BuscaComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'esqueci', component: EsqueciComponent },
  { path: '**', redirectTo: '' }
];