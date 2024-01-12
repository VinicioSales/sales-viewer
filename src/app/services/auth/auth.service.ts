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
    private router: Router 
) { }

 //NOTE - Registrar usuário
 registrarUsuario(username: string, email: string, password: string): Observable<any>{
  return this.http.post(`${urlBackend}/${rotaRegistrarUsuarios}`,{username, email,password});
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

      //NOTE - logout
  logout(): void {
    localStorage.removeItem('token_de_autenticacao');
    this.router.navigate(['/login']);
  }
}
