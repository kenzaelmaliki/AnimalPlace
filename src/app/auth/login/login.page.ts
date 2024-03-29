import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthRequest } from '../security/auth-request.model';
import { AuthService } from '../security/auth.service';
import { WebsocketService } from 'src/app/websocket.service';
import { UserService } from 'src/app/api/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage {
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   *
   * NOTE: The "Partial<AuthRequest>" type here has the same properties as "AuthRequest",
   * but they are all optional.
   */
  authRequest: Partial<AuthRequest> = {};

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  loginError = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private wsService: WebsocketService,
    private userService: UserService
  ) {
    this.authRequest = {};
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.loginError = false;

    // Perform the authentication request to the API.
    // NOTE: Since our form is valid, it means that "this.authRequest" is actually
    // a perfectly valid "AuthRequest" object, and that's what we are telling TypeScript
    // here with "as AuthRequest".
    this.auth.logIn$(this.authRequest as AuthRequest).subscribe({
      next: (user) => {
        this.userService.startUpdatingPosition(user._id);
        this.router.navigateByUrl('/tabs/meeting');
      },
      error: (err) => {
        this.loginError = true;
        console.warn(`Authentication failed: ${err.message}`);
      },
    });
  }
}
