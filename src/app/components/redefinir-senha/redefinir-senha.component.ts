import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MensagensService } from 'src/app/services/mensagens/mensagens.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css']
})
export class RedefinirSenhaComponent {
  constructor(    
    private router: Router,
    private authService: AuthService,
    public mensagensService: MensagensService,
  ) {}




  @Input() mensagemModal: string = '';

  valorNovaSenha: string = '';
  carregando: boolean = false;
  mostrarModal: boolean = false;
  valorCodigoVerificacao: string = '';
  valorConfirmarNovaSenha: string = '';
  corBotao: string = 'var(--cor-botao)';


  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
    this.mensagemModal = '';
  }

  //NOTE - onValorInputChange
  onValorInputChange(novoValor: string, inputId: string) {
    switch (inputId) {
      case 'inputNovaSenha':
        this.valorNovaSenha = novoValor;
        break;
        
      case 'inputConfirmarNovaSenha':
        this.valorConfirmarNovaSenha = novoValor;
        break;
      
        case 'inputCodigoVerificacao':
        this.valorCodigoVerificacao = novoValor;
        break;
    }
  }

  //NOTE - validarSenha
  validarSenhas() {
    if (this.valorNovaSenha.length < 8) {
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_SENHA_CURTA);

      return false;

    } else if (this.valorNovaSenha != this.valorConfirmarNovaSenha) {
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_SENHAS_DIFERENTES);
      return false;
    }

    return true;
  }

  //NOTE - validarCampos
  validarCampos() {
    if (this.valorNovaSenha.trim() == '' && this.valorConfirmarNovaSenha.trim() == '' && this.valorCodigoVerificacao.trim() == '') {
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_CAMPOS_VAZIOS);
      return false;
    
    } else if (this.valorNovaSenha.trim() == '') {
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_NOVA_SENHA_VAZIO);
      return false;

    } else if (this.valorConfirmarNovaSenha.trim() == '') {
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_CONFIRMAR_NOVA_SENHA_VAZIO);
      return false;

    } else if (this.valorCodigoVerificacao.trim() == '') {
      this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_CODIGO_VERIFICACAO_VAZIO);
      return false;
    }

    return true;
  }

  //NOTE - validar
  validar(funcoes: Array<() => boolean>): boolean {
    return funcoes.every(func => func());
  }

  //NOTE - onRedefinirSenha
  onRedefinirSenha() {
    const validado = this.validar([
      () => this.validarSenhas(),
      () => this.validarCampos()
    ]);
    
    if (validado) {
      this.mostrarCarregando();
      this.authService.redefinirSenha(this.valorNovaSenha, this.valorCodigoVerificacao).subscribe({
        next: (response) => {
          this.esconderCarregando();
          this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_SENHA_REDEFINIDA);
          this.router.navigate(['/login']);
        },

        error: (error) => {
          this.esconderCarregando();

          if (error.status === 401) {
            this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_CODIGO_VERIFICACAO_INVALIDO);
          } else if (error.status === 500) {
            this.mensagensService.exibirMensagemModal(MensagensService.MENSAGEM_ERRO_INTERNO);
          } else {
            this.mensagensService.exibirMensagemModal(`Erro desconhecido: ${error}`);
          }
        }
      })
    }
  }

   //NOTE - mostrarCarregando
  mostrarCarregando() {
    this.carregando = true;
  }

  //NOTE - esconderCarregando
  esconderCarregando() {
    this.carregando = false;
  }

}
