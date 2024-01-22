import { ErrorHandler, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor(private toastService: ToastController) {}

  handleError(error: any): void {
    console.error(error);
    let message = error.message || error.toString();
    //  console.error(error);
    //  console.log('Une erreur est survenue', error);

    this.toastService
      .create({
        message: message,
        duration: 3000,
        position: 'bottom',
      })
      .then((toast) => {
        toast.present();
      });
  }
}
