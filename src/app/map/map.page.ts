import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, marker, Marker, MapOptions, tileLayer, Map} from 'leaflet';
import { defaultIcon } from '../default-marker';



@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LeafletModule]
})
export class MapPage implements OnInit {
  mapOptions: MapOptions;
  mapMarkers: Marker[];

  constructor() { 
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };

    this.mapMarkers = [
      marker([ 46.778186, 6.641524 ], { icon: defaultIcon }),
      marker([ 46.780796, 6.647395 ], { icon: defaultIcon }),
      marker([ 46.784992, 6.652267 ], { icon: defaultIcon })
    ];
  }

  ngOnInit() {
  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
  }

  
}