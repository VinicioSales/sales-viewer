import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBackend, rotaLogin, rotaEsqueciSenha, rotaRedefinirSenha, rotaRegistrarUsuarios } from 'src/app/services/static'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(  
    private http: HttpClient,
) { }

 //NOTE - Registrar usuário
 registrarUsuario(nome: string, email: string, senha: string): Observable<any>{
  return this.http.post(`${urlBackend}/${rotaRegistrarUsuarios}`,{nome, email,senha});
}  

//NOTE - redefinirSenha
redefinirSenha(novaSenha: string, codigoVerificacao: string): Observable<any> {
  return this.http.post(`${urlBackend}/redefinir-senha`, { novaSenha, codigoVerificacao });
}
  
//NOTE - login
  login(email: string, senha: string): Observable<any> {
    const data = {
      username: email,
      password: senha
    }
    return this.http.post(`${urlBackend}${rotaLogin}`, data);
  }

    //NOTE recuperarSenha
    recuperarSenha(email: string): Observable<any> {
      return this.http.post(`${urlBackend}${rotaEsqueciSenha}`, { email });
    }
}
