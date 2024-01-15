// profil.page.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { User } from '../models/user.model';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../auth/security/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ProfilPage implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService, private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser$().subscribe(user => this.user = user);
    console.log("USER" + this.user);
   /* this.userService.getUser(userId).subscribe((userData) => {
      this.user = userData;
    });*/
    // Obtenez l'ID de l'utilisateur à partir de votre service d'authentification ou d'une autre source
    const userId = this.user?._id/* Obtenez l'ID de l'utilisateur */;
    
  }
}
