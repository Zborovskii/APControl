import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id;
  title;
  owner;
  place;
  dateOfDetection;
  dateOfFixing;
  image;
  type;

  constructor(
    private firebaseService:FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      this.title = listing.title;
      this.owner = listing.owner;
      this.place = listing.place;
      this.dateOfDetection = listing.dateOfDetection;
      this.dateOfFixing = listing.dateOfFixing;
      this.type = listing.type;
    });
  }

  onEditSubmit(){
    let listing = {
        title: this.title,
        owner: this.owner,
        place: this.place,
        dateOfDetection: this.dateOfDetection,
        dateOfFixing: this.dateOfFixing || "none",
        type: this.type
    }

    this.firebaseService.updateListing(this.id, listing);

    this.router.navigate(['/listings']);
  }

}
