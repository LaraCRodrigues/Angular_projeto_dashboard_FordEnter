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

  constructor(private vehicleService: Vehicle) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {

    this.vehicleService.getVeiculos().subscribe({

      next: (resposta) => {

        console.log('Veículos recebidos:', resposta);

        this.veiculos = resposta.vehicles;

        // Monta o endereço completo das imagens
        this.veiculos.forEach(veiculo => {

          if (veiculo.vehicle === 'Ranger') {
            veiculo.img = 'http://localhost:3001/img/ranger.png';
          }

          if (veiculo.vehicle === 'Mustang') {
            veiculo.img = 'http://localhost:3001/img/mustang.png';
          }

          if (veiculo.vehicle === 'Territory') {
            veiculo.img = 'http://localhost:3001/img/territory.png';
          }

          if (veiculo.vehicle === 'Bronco Sport') {
            veiculo.img = 'http://localhost:3001/img/bronco-sport.png';
          }

        });

        console.log('Veículos com imagens:', this.veiculos);

        // Seleciona o primeiro veículo
        if (this.veiculos.length > 0) {

          this.veiculoSelecionado = this.veiculos[0];

          this.nomeVeiculo = this.veiculos[0].vehicle;

        }

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

      console.log('Veículo selecionado:', veiculo);

      console.log('Imagem:', veiculo.img);

    }

  }

}