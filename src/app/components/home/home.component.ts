import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  @Input() mensagemModal: string = '';
  
  mostrarModal: boolean = false;

  //NOTE - handleFecharModal
  handleFecharModal() {
    this.mostrarModal = false;
  }

  //NOTE - onLogout
  onLogout() {
    this.authService.logout();
  }

  //NOTE - navegarRotaSolicitarProdutos
  navegarRotaSolicitarProdutos() {
    this.router.navigate(['/requisitar-produtos']);
  }
  
  //NOTE - navegarRotaDevolverProdutos
  navegarRotaAnteciparParcelas() {
    this.router.navigate(['/antecipacao']);
  }
  
}
