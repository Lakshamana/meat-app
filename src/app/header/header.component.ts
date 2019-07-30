import { Component, OnInit } from '@angular/core'
import { LoginService } from 'app/security/login/login.service'

@Component({
  selector: 'mt-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  isLoginRoute() {
    const url = this.loginService.lastUrl
    return url && url.startsWith('/login')
  }
}
