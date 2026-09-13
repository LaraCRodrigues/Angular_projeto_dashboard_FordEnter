import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  menuAberto: boolean = false;

  abrirMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  logout(): void {
  const confirmar = confirm('Tem certeza que deseja sair?');

  if (confirmar) {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  }
}
}