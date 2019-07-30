import {
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from '@angular/router'
import { Injectable } from '@angular/core'
import { LoginService } from './login/login.service'

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {
  constructor(private loginService: LoginService) {}

  checkLoggedIn(path: string): boolean {
    const loggedIn = this.loginService.isLoggedIn()
    if (!loggedIn) {
      this.loginService.handleLogin(`/${path}`)
    }
    return loggedIn
  }

  canLoad(route: Route): boolean {
    console.log('canLoad')
    return this.checkLoggedIn(route.path)
  }

  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {
    console.log('canActivate')
    return this.checkLoggedIn(activatedRoute.routeConfig.path)
  }
}
