// profil.page.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { User } from '../models/user.model';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth/security/auth.service';
import { AnimalService } from '../api/animal.service';
import { Animal } from '../models/animal.model';
import { cogOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProfilPage implements OnInit {
  userID: string | undefined;
  user: User | undefined;
  animals: Animal[] | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly animalService: AnimalService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.animalService.getAnimals().subscribe((animals) => {
      console.log(animals);
      this.animals = animals;
      console.log('je passe');
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.fetchUserData(); // Call the method to fetch user data
  }

  fetchUserData() {
    this.authService.getUser$().subscribe((user) => {
      this.userID = user?._id;
      console.log('get user ! ', user?._id);

      if (this.userID) {
        this.userService.getUser(this.userID).subscribe((user) => {
          this.user = user;
          console.log('user dans le sub ', this.user);
        });
      }
    });
  }

  onIconClick() {
    this.router.navigate(['edit-profile']);
  }

  logout() {
    this.authService.logOut();
  }
}
