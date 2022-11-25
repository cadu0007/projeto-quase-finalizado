import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desafio',
  templateUrl: './desafio.component.html',
  styleUrls: ['./desafio.component.scss']
})
export class DesafioComponent implements OnInit {
  mensagemHeader: string = ''
  constructor(private router:Router) { }

  
  ngOnInit(): void {
    console.log(this.router.url);
    if(this.router.url === '/home') {this.mensagemHeader = 'conheça nossa coletânea'}
    else if (this.router.url === '/usuario') { this.mensagemHeader = 'Faça o Cadastro de usuários e  edite, caso necessário Pronto para cadastrar? '}
    else if (this.router.url === '/filme') { this.mensagemHeader = 'Cadastre os filmes de sua preferência '}
    else if (this.router.url === '/genero') { this.mensagemHeader = 'Cadastre os gêneros dos filmes'}
  }
}
