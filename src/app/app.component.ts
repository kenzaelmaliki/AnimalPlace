import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Storage } from "@ionic/storage";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, LeafletModule],
})
export class AppComponent {
  constructor(storage: Storage) {
    storage.create();
  }
}
