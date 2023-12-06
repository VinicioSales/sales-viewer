import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlBackend } from '../statics';

@Injectable({
  providedIn: 'root',
})
export class LogService {

  constructor(private http: HttpClient) {}

  log(message: string): void {
    // Aqui você pode implementar lógica para filtrar logs baseado no ambiente
    this.sendLogToServer({ level: 'info', message });
  }

  error(message: string): void {
    this.sendLogToServer({ level: 'error', message });
  }

  private sendLogToServer(log: any): void {
    this.http.post(urlBackend, log).subscribe({
      error: (err) => console.error('Erro ao enviar log para o servidor', err),
    });
  }
}
