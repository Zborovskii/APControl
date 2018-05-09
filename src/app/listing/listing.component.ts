import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id:any;
  listing: any;
  imageUrl:any;
  createrEmail:any;
  ownEmail:any;
  isOwnObservation:boolean;

  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute,
    private authService: AuthService,
  ) { 
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
    });
  }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    

    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      this.listing = listing;
      this.createrEmail = listing.createrEmail;
      let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(listing.path);
      storageRef.child(listing.path).getDownloadURL().then((url) => {
        // Set image url
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });
    });
    this.isOwnObservation = this.ownEmail === this.createrEmail;

  }

  onDeleteClick() {
    this.firebaseService.deleteListing(this.id);

    this.router.navigate(['/listings']);
  }

}
