import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';

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

  vin: string = '';
  dadosVeiculo: any = null;

  private vinBusca = new Subject<string>();

  menuAberto: boolean = false;

  constructor(private vehicleService: Vehicle) {}

  ngOnInit(): void {

    // Carrega os veículos da API
    this.carregarVeiculos();

    // Configuração da busca reativa do VIN
    this.vinBusca.pipe(
      debounceTime(500),

      filter(vin => vin.length >= 5),

      distinctUntilChanged()

    ).subscribe(vin => {
      this.buscarVin(vin);
    });
  }

  carregarVeiculos(): void {

    this.vehicleService.getVeiculos().subscribe({

      next: (veiculos) => {

        console.log('Veículos recebidos:', veiculos);

        this.veiculos = veiculos;

        this.veiculoSelecionado = null;
        this.nomeVeiculo = '';
      },

      error: (erro) => {

        console.error(
          'Erro ao carregar veículos:',
          erro
        );

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

  buscarPorVin(): void {

    const vinDigitado = this.vin.trim();

    if (!vinDigitado) {

      this.dadosVeiculo = null;

      return;
    }

    // Envia o VIN para o Subject
    this.vinBusca.next(vinDigitado);

  }

  buscarVin(vin: string): void {

    this.vehicleService.getVehicleData(vin).subscribe({

      next: (resposta) => {

        console.log(
          'Dados do veículo:',
          resposta
        );

        this.dadosVeiculo = resposta;

      },

      error: (erro) => {

        console.error(
          'Erro ao buscar VIN:',
          erro
        );

        this.dadosVeiculo = null;

      }

    });

  }

  abrirMenu(): void {

    this.menuAberto = !this.menuAberto;

  }

  fecharMenu(): void {

    this.menuAberto = false;

  }

  logout(): void {

    const confirmar = confirm(
      'Tem certeza que deseja sair?'
    );

    if (confirmar) {

      localStorage.removeItem('usuario');

      window.location.href = '/login';

    }

  }

}