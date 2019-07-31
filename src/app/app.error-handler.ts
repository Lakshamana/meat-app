import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable } from '@angular/core'
import { NotificationService } from './shared/messages/notification.service'

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(private ns: NotificationService) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      switch (errorResponse.status) {

      }
    }
    super.handleError(errorResponse)
  }
}
