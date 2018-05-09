import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  title:any;
  owner:any;
  place:any;
  dateOfDetection:any;
  dateOfFixing:any;
  type:any = 'Выявлено';
  image:any;
  createrEmail: string;
  firstname: string;
  lastname: string;
  userId: string;
  user: any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
    private authService: AuthService,
    private userService: UserService,
  ) { 
    authService.authUser().subscribe(user => {
    this.createrEmail = user.email;
    this.userId = user.uid;
  });}

  ngOnInit() {
    this.dateOfDetection = this.firebaseService.getDate();
  }

  onAddSubmit(){
    let listing = {
      title: this.title,
      place: this.place,
      owner: this.userService.userName,
      dateOfDetection:this.dateOfDetection,
      dateOfFixing: this.dateOfFixing || "не устранено",
      type: this.type,
      createrEmail: this.createrEmail
    }

    this.firebaseService.addListing(listing);

    this.router.navigate(['listings']);
  }

}
