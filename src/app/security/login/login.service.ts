import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router, NavigationEnd } from '@angular/router'

import { MEAT_API } from 'app/app.api'
import { User } from './user.model'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/filter'

@Injectable()
export class LoginService {
  user: User
  lastUrl: string

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
  }

  login(email: string, password: string): Observable<User> {
    const params = { email, password }
    return this.http
      .post<User>(`${MEAT_API}/login`, params)
      .do(user => (this.user = user))
  }

  isLoggedIn(): boolean {
    return !!this.user
  }

  logout() {
    this.user = undefined
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)])
  }
}
