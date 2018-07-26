import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/service/auth.service';


@Component({
  selector: 'buh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  date:Date = new Date;
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse( window.localStorage.getItem('user') );
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
