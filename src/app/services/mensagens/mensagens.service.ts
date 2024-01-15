import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor() { }

  static readonly MENSAGEM_EMAIL_JA_REGISTRADO = 'Email já registrado';
  static readonly MENSAGEM_CAMPOS_VAZIOS = 'Preencha todos os campos!';
  static readonly MENSAGEM_NOVA_SENHA_VAZIO = 'Campo nova senha vazio';
  static readonly MENSAGEM_SENHAS_DIFERENTES = 'As senhas não conferem!';
  static readonly MENSAGEM_CAMPOS_VAZIO = 'Todos os campos são obrigatórios!';
  static readonly MENSAGEM_SENHA_REDEFINIDA = 'Senha redefinida com sucesso!';
  static readonly MENSAGEM_EMAIL_INVALIDO = 'Email está com formato inválido!';
  static readonly MENSAGEM_FORMATO_NOME_INCORRETO = 'Formato do nome incorreto';
  static readonly MENSAGEM_ITENS_NAO_SELECIONADOS = 'Selecione ao menos um ítem';
  static readonly MENSAGEM_REGISTRO_CONCLUIDO = 'Usuário cadastrado com sucesso!';
  static readonly MENSAGEM_SENHA_CURTA = 'A senha deve ter no mínimo 8 caracteres!';
  static readonly MENSAGEM_CODIGO_VERIFICACAO_INVALIDO = 'Código de verificação inválido!';
  static readonly MENSAGEM_CODIGO_VERIFICACAO_VAZIO = 'Campo código de verificação vazio!';
  static readonly MENSAGEM_CONFIRMAR_NOVA_SENHA_VAZIO = 'Campo confirmar nova senha vazio!';
  static readonly MENSAGEM_ERRO_DESCONHECIDO = 'Ocorreu um erro desconehcido! Tente novamente mais tarde ou entre em contato com o suporte';
  static readonly MENSAGEM_ERRO_INTERNO = 'Ocorreu um erro inesperado, tente novamente em alguns minutos. Caso o erro persista, entre em contato com o suporte.';
  static readonly MENSAGEM_INTERNAL_SERVER_ERROR = 'Ocorreu um erro inesperado, tente de novo em alguns instantes. Se o erro persistir, entre em contato com o suporte.'

  private mostrarModalSource = new BehaviorSubject<boolean>(false);
  private mensagemModalSource = new BehaviorSubject<string>('');

  mostrarModal$ = this.mostrarModalSource.asObservable();
  mensagemModal$ = this.mensagemModalSource.asObservable();

  exibirMensagemModal(mensagem: string): void {
    this.mensagemModalSource.next(mensagem);
    this.mostrarModalSource.next(true);
  }

  fecharModal(): void {
    this.mostrarModalSource.next(false);
  }
}
