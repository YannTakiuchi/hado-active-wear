import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html'
})
export class App {
  cart = inject(CartService);
  private router = inject(Router);

  buscar(termo: string): void {
    this.router.navigate(['/busca'], { queryParams: { q: termo.trim() } });
  }
}