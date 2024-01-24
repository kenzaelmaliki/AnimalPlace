import { Injectable } from '@angular/core';
import { Observable, Observer, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

const WS_SERVER_URL = 'wss://archioweb-animalsplace.onrender.com';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private ws$ = new ReplaySubject<WebSocket>(1);

  constructor(private toastService: ToastController) {
    const socket = new WebSocket(WS_SERVER_URL);
    socket.onopen = () => {
      console.log('Successfully connected to the WebSocket at', WS_SERVER_URL);
      this.ws$.next(socket);
    };
  }

  public listen<T = any>(): Observable<T> {
    return this.ws$.pipe(
      switchMap(
        (socket) =>
          new Observable((subscriber: Observer<MessageEvent<T>>) => {
            socket.onmessage = (message) => {
              subscriber.next(message);
              // Ajoutez ici l'affichage du Toast lors de la réception d'un message
              this.showToast(this.extractMessage(message));
            };
            socket.onerror = (error) => subscriber.error(error);
            socket.onclose = () => subscriber.complete();

            return () => socket.close();
          })
      ),
      map((event: MessageEvent<T>) => event.data)
    );
  }

  public send(data: unknown): void {
    this.ws$.subscribe((socket) => {
      socket.send(JSON.stringify(data));
      console.log('Message sent');
      //  this.showToast('Message envoyé');
    });
  }

  private extractMessage(message: MessageEvent): string {
    try {
      const data = JSON.parse(message.data);
      if (data && typeof data === 'object' && data.message) {
        return data.message;
      }
    } catch (error) {}

    return message.data.toString();
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastService.create({
      message: message,
      duration: 5000,
      position: 'bottom',
    });
    toast.present();
  }
}
