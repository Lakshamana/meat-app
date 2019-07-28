import { HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'

export class ErrorHandler {
  static handleError(error: HttpErrorResponse | any) {
    let errorMessage: string
    if (error instanceof HttpErrorResponse) {
      const body = error.error
      errorMessage = `Erro ${error.status} (${error.statusText ||
        ''}) ao acessar a URL ${error.url}: ${body}`
    } else {
      errorMessage = error.message ? error.message : error.toString()
    }
    return Observable.throw(errorMessage)
  }
}
