import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router:Router) {}

  logout() {
    this.authService.logout();
    Swal.fire({
      title: 'LogOut Successfullly',
      icon: 'success'
    });
    this.router.navigate(['/Login']);
  }
}
