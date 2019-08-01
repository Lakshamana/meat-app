import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core'
import { NotificationService } from './shared/messages/notification.service'

const httpStatus = {
  403: 'Acesso proibido.',
  401: 'Não autorizado.',
  404: 'Recurso não encontrado. Verifique o console para mais detalhes'
}

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(private injector: Injector, private ngZone: NgZone) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message
      const ns = this.injector.get(NotificationService)
      this.ngZone.run(() => {
        ns.notify(message || httpStatus[errorResponse.status])
      })
    }
    super.handleError(errorResponse)
  }
}
