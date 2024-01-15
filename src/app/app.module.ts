import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';

@NgModule({
 /* declarations: [
        AppComponent
      
    // Vos autres composants, directives, etc.
  ],*/
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    // Configuration de IonicStorageModule avec les options de configuration souhaitées
    IonicStorageModule.forRoot({
      name: '_myAppDB', // Nom de la base de données (optionnel)
      driverOrder: ['indexeddb', 'sqlite', 'websql'] // Ordre des pilotes de stockage (optionnel)
      // Autres options si nécessaire
    })
  ],
  providers: [],
 /* bootstrap: [AppComponent]*/
})
export class AppModule { }
