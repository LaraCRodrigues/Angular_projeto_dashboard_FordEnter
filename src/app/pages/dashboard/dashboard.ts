import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../../services/vehicle';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  veiculos: any[] = [];
  veiculoSelecionado: any = null;
  nomeVeiculo: string = '';

  // CONTROLE DO MENU MOBILE
  menuAberto: boolean = false;

  constructor(private vehicleService: Vehicle) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }
carregarVeiculos(): void {
  this.vehicleService.getVeiculos().subscribe({
    next: (resposta) => {
      console.log('Veículos recebidos:', resposta);

      this.veiculos = resposta.vehicles;

      this.veiculoSelecionado = null;
      this.nomeVeiculo = '';
    },

    error: (erro) => {
      console.error('Erro ao carregar veículos:', erro);
    }
  });
}
  mudarVeiculo(): void {
    const veiculo = this.veiculos.find(
      item => item.vehicle === this.nomeVeiculo
    );

    if (veiculo) {
      this.veiculoSelecionado = veiculo;
    }
  }

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