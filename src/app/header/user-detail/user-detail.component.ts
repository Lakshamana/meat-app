import { Component, OnInit } from '@angular/core'
import { LoginService } from 'app/security/login/login.service'

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  label = 'Entrar'

  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  user() {
    return this.loginService.user
  }

  loggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  login() {
    this.loginService.handleLogin()
  }

  logout() {
    this.loginService.logout()
  }
}
