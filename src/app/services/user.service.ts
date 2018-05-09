import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class UserService {
  user: firebase.User;
  lastname: Observable<string>;
  listing: FirebaseObjectObservable<any>;
  firstname: Observable<string>;
  patronymic: Observable<string>;
  subsidiary: Observable<string>;
  tabNumber: Observable<string>;
  userName: any;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
      this.afAuth.authState.subscribe(auth => {
        if (auth !== undefined && auth !== null) {
          this.user = auth;
        }

        this.getUser().subscribe(a => {
          this.lastname = a.lastname;
          this.firstname = a.firstname;
          this.patronymic = a.patronymic;
          this.tabNumber = a.tabNumber;
          this.subsidiary = a.subsidiary;
          this.userName = this.lastname + ' ' + this.firstname;

        });
      });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

}
