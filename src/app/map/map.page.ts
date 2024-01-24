import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewDidEnter } from '@ionic/angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, marker, Marker, MapOptions, tileLayer, Map } from 'leaflet';
import { defaultIcon } from '../default-marker';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule],
})
export class MapPage implements ViewDidEnter {
  mapOptions: MapOptions;
  mapMarkers: Marker[];

  constructor(private userService: UserService) {
    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
        }),
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524),
    };

    this.mapMarkers = [];
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.userService.getAllUsers().subscribe((result) => {
      const users = result.users;
      this.mapMarkers = []; // Reset markers
      for (let i = 0; i < users.length; i++) {
        this.mapMarkers.push(
          marker(users[i].location.coordinates, {
            icon: defaultIcon,
            title: users[i].firstName + ' ' + users[i].lastName,
          }).bindPopup(users[i].firstName)
        );
      }
    });
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }
}
