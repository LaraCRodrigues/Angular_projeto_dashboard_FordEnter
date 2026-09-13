import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  nome: string = '';
  senha: string = '';
  mensagem: string = '';
  carregando: boolean = false;

  cardOculto: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.mensagem = '';
    this.carregando = true;

    const dadosLogin = {
      nome: this.nome,
      senha: this.senha
    };

    this.http.post(
      'http://localhost:3001/login',
      dadosLogin
    ).subscribe({
      next: (resposta) => {
        console.log('Login realizado:', resposta);
        this.carregando = false;
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.error('Erro no login:', erro);
        this.carregando = false;

        if (erro.status === 401) {
          this.mensagem = 'Usuário ou senha incorretos.';
        } else {
          this.mensagem = 'Não foi possível conectar com o servidor.';
        }
      }
    });
  }

  ocultarCard(): void {
    this.cardOculto = true;
  }

  mostrarCard(): void {
    this.cardOculto = false;
  }

  alternarSom(video: HTMLVideoElement): void {
    video.muted = !video.muted;
  }
}