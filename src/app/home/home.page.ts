import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import {
  Geolocation,
  PermissionStatus,
  Position,
} from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  permission: PermissionStatus | undefined;
  geolocationPosition: Position | undefined;
  navigatorPosition: GeolocationPosition | undefined;

  constructor(private platform: Platform) {}

  requestPermission() {
    console.log('requestPermission clicked');
    Geolocation.requestPermissions({
      permissions: ['location', 'coarseLocation'],
    })
      .then((value) => {
        this.permission = value;
        console.log('requestPermission success:', value);
      })
      .catch((error) => console.log('requestPermission error:', error));
  }

  geolocation() {
    console.log('geolocation clicked');
    Geolocation.getCurrentPosition()
      .then((value) => {
        this.geolocationPosition = value;
        console.log('geolocation success:', value);
      })
      .catch((error) => console.log('geolocation error:', error));
  }

  navigator() {
    console.log('navigator clicked');
    this.platform.ready().then(() => {
      navigator.geolocation.getCurrentPosition(
        (value) => {
          this.navigatorPosition = value;
          console.log('navigator success:', value);
        },
        (error) => console.log('navigator error:', error)
      );
    });
  }
}
