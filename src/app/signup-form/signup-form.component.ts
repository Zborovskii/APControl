import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {

  email: string;
  password: string;
  tabNumber: string;
  errorMsg: string;
  subsidiary: string;
  lastname: string;
  firstname: string;
  patronymic: string;


  // subsidiaryList: [
  //   'Арзамасское ЛПУМГ',
  //   'Владимирское ЛПУМГ',
  //   'Волжское ЛПУМГ',
  //   'Вятское ЛПУМГ',
  //   'Заволжское ЛПУМГ',
  //   'Чебоксарсоке ЛПУМГ'
  // ];

  constructor(private authService: AuthService, private router: Router) { }

  signUp() {
    const email = this.email;
    const password = this.password;
    const tabNumber = this.tabNumber;
    const subsidiary = this.subsidiary;
    const lastname = this.lastname;
    const firstname = this.firstname;
    const patronymic = this.patronymic;

    this.authService.signUp(email, password, tabNumber, subsidiary, lastname, firstname, patronymic)
      .then(resolve => this.router.navigate(['listings']))
      .catch(error => this.errorMsg = error.message);
  }
}
