import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CriarUsuario } from '../models/salvar-usuario.model';
import { SalvarUsuarioService } from '../service/salvar-usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  form!: FormGroup
  usuario!: CriarUsuario[]
  usuariosId!:number
  verificarEditar: boolean = false

  constructor(
    private fb: FormBuilder,
    private SalvarUsuarioService: SalvarUsuarioService
  ) { }

  ngOnInit(): void {
    this.lerDadosUsuario()
    this.form = this.fb.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl('')
    })

  }
  lerDadosUsuario() {
    this.SalvarUsuarioService.lerUsuario().subscribe({
      next: (usuarios: CriarUsuario[]) => {
        this.usuario = usuarios
        console.log(this.usuario);
      },

      error: () => {
        console.log('Função lerDadosUsuario deu problema!!');
      }
    })
  }

  cadastrarDadosUsuario() {
    const id = (this.usuario[(this.usuario.length) - 1].id) + 1
    const nome = this.form.controls['nome'].value
    const email = this.form.controls['email'].value
    const telefone = this.form.controls['telefone'].value

    const usuario: CriarUsuario = {
      id: id,
      nome: nome,
      email: email,
      telefone: telefone
    }
    this.SalvarUsuarioService.cadastrarUsuario(usuario).subscribe({
      next: () => {
        this.lerDadosUsuario()
        console.log("salvou");
      },
      error: () => {
        console.log("Erro cadastrar!!");
      }
    })
  }

  deleteDadosUsuarios(idUsuario: number) {
    this.SalvarUsuarioService.deleteUsuario(idUsuario).subscribe({
      next: () => {
        this.lerDadosUsuario()
        console.log("deletou!!");
      },
      error: () => {
        console.log("Erro Deletar");

      }
    })
  }

  EditarCliente1(){
    const id = this.usuariosId
    const nome = this.form.controls["nome"].value;
    const email = this.form.controls["email"].value;
    const telefone = this.form.controls["telefone"].value;

    const usuario: CriarUsuario = {id:id, nome:nome, email:email, telefone:telefone}

    this.SalvarUsuarioService.editarUsuario(usuario).subscribe({
      next: () => {
      console.log("editou");
        
        this.lerDadosUsuario()
      },
      error: () => {
        console.log("erro");
        
      }
    })
    this.verificarEditar = false
    this.form.reset()
  }

  EditarCliente2(itemUsuario:CriarUsuario){
    this.usuariosId = itemUsuario.id
    this.form.controls["nome"].setValue(itemUsuario.nome)
    this.form.controls["email"].setValue(itemUsuario.email)
    this.form.controls["telefone"].setValue(itemUsuario.telefone)
    this.verificarEditar = true
  }
}
  
