import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../api/user.service';
import { AuthRequest } from '../../models/auth-request';
import { AuthService } from '../security/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './sigup.page.html',
  styleUrls: ['./sigup.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule, FormsModule],
})
export class SignupPage {
  imports = [ReactiveFormsModule, CommonModule];
  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest = {
    email: '',
    password: '',
  };

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  signupError: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  /**
   * Called when the login form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    // console.log(form)
    if (form.invalid) {
      return;
    }
    let userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email.toLocaleLowerCase(),
      password: this.password,
    };

    this.signupError = false;

    this.userService.addUser(userData).subscribe(
      (user) => {
        this.authRequest = {
          email: this.email.toLocaleLowerCase(),
          password: this.password,
        };
        this.auth.logIn$(this.authRequest).subscribe({
          next: () => this.router.navigateByUrl('/'),
          error: (err) => {
            console.warn(`Authentication failed: ${err.message}`);
          },
        });
      },

      (err) => {
        this.signupError = true;
      }
    );
  }
}
