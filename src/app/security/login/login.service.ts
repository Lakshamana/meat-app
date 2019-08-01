import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router, NavigationEnd } from '@angular/router'

import { MEAT_API } from 'app/app.api'
import { User } from './user.model'

import { Observable } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

@Injectable()
export class LoginService {
  user: User
  lastUrl: string

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => (this.lastUrl = e.url))
  }

  login(email: string, password: string): Observable<User> {
    const params = { email, password }
    return this.http
      .post<User>(`${MEAT_API}/login`, params)
      .pipe(tap(user => (this.user = user)))
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

  handleLogout() {
    this.router.navigate(['/'])
    this.logout()
  }
}
