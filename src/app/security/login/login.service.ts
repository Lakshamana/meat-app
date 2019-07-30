import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { MEAT_API } from 'app/app.api'
import { User } from './user.model'

@Injectable()
export class LoginService {
  user: User

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    const params = { email, password }
    return this.http.post<User>(`${MEAT_API}/login`, params)
      .do(user => this.user = user)
  }

  isLoggedIn(): boolean {
    return !!this.user
  }
}
