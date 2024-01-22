import { ErrorHandler, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private toastService: ToastController) {}

  handleError(error: any): void {
    let message = error.message || error.toString();
    console.error(error);
    console.log('Une erreur est survenue', error);

    this.toastService
      .create({
        message: message,
        duration: 5000,
        position: 'bottom',
        color: 'danger',
      })
      .then((toast) => {
        toast.present();
      });
  }
}
