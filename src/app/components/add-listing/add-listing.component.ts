import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

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

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit(){
    let listing = {
      title: this.title,
      place: this.place,
      owner: this.owner,
      dateOfDetection:this.dateOfDetection,
      dateOfFixing: this.dateOfFixing || "none",
      type: this.type
    }

    this.firebaseService.addListing(listing);

    this.router.navigate(['listings']);
  }

}
