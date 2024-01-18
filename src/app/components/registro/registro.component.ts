import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { TemaService } from '../../services/tema/tema.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public imgSrc?: string;
  private imgTemaClaro: string = 'assets/img/logo-parceiro-vertical-preto-1.png';
  private imgTemaEscuro: string = 'assets/img/imgogo-parceiro-vertical-branco-1.png';
  constructor(
    private router: Router,
    private authService: AuthService,
    private temaService: TemaService,
    public mensagensService: MensagensService,
  ) {
    this.atualizarImg();
    
     // Escute as mudanças do tema
      this.temaService.temaEscuroLigado$.subscribe(estaEscuro => {
        this.atualizarImg();
      });
    }

  //NOTE - atualizarImg
  atualizarImg() {
    this.imgSrc = this.temaService.temaEscuroLigado ? this.imgTemaEscuro : this.imgTemaClaro;
  }
  
  nomeValue: string = ''; 
  emailValue: string = '';  
  senhaValue: string = '';
  mensagemModal: string = '';
  carregando: boolean = false;
  mostrarModal: boolean = false;
  mostrarSenha: boolean = false;
  confirmarSenhaValue: string = '';

  handleVizualizacaoSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  onNomeValueChanged(inputNome: string) {
    // Esta função será acionada quando o valor do input de nome mudar
    this.nomeValue = inputNome;    
    
  }

  onEmailValueChanged(inputEmail: string){
    this.emailValue = inputEmail;
  }
  
  onSenhaValueChanged(inputSenha: string){
    this.senhaValue = inputSenha;
  }

  
  onConfirmarSenhaValueChanged(inputConfirmarSenha: string){
    this.confirmarSenhaValue = inputConfirmarSenha;
  }

  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

  //NOTE - validarEmail
  validarEmail(email: any): boolean {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email);
  }

   //NOTE - validarSenha
    validarSenha(senha: any): boolean {
    return senha.length >= 8;
  }

  verificarNumeroNoNome(nome: string): boolean {
    for (const caractere of nome) {
      if (/\d/.test(caractere)) {
        return true;
      }
    }
    return false;
  }
  
  //NOTE - validarCredenciais
  validarCredenciais(): boolean{
    if(!this.nomeValue.trim()|| !this.emailValue.trim()|| !this.senhaValue.trim() || !this.confirmarSenhaValue.trim()) {
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_CAMPOS_VAZIO);
      return false;
    }

    else if (this.verificarNumeroNoNome(this.nomeValue)) {      
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_FORMATO_NOME_INCORRETO);
      return false;
    }

    else if (!this.validarEmail(this.emailValue)){
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_EMAIL_INVALIDO);
      return false;
    }

    else if (this.senhaValue != this.confirmarSenhaValue){
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_SENHAS_DIFERENTES);
      return false;
    }

    else if (!this.validarSenha(this.senhaValue)){
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_SENHA_CURTA);
      return false;
    }

    this.fecharMensagemModal();
    return true;
  }

  //NOTE - fecharMensagemModal
  fecharMensagemModal() {
    this.mostrarModal = false;
    this.mensagemModal = "";
  }

  //NOTE - mostrarCarregando
  mostrarCarregando() {
    this.carregando = true;
  }

  //NOTE - esconderCarregando
  esconderCarregando() {
    this.carregando = false;
  }

  //NOTE - OnRegistro 
  onRegistro(){
    const credenciaisValidadas = this.validarCredenciais();
    if (credenciaisValidadas){
      this.mostrarCarregando();
      
      this.authService.registrarUsuario(this.nomeValue, this.emailValue, this.senhaValue).subscribe({
        next: (response) => {
          
          this.esconderCarregando();
            this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_REGISTRO_CONCLUIDO);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);               
    
        },
        error: (error) => {
          this.esconderCarregando();
          this.mensagensService.exibirMensagemModal(error.error);
        }
      });
      
    }
  }
}
