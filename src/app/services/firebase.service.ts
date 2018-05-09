import { Injectable } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  folder: any;
  users:any;
  user:any;
  date: any;

  constructor(private db: AngularFireDatabase) {
    this.folder = 'listingimages';
    this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>
    this.users = this.db.list('/users') as FirebaseListObservable<User[]>
  }

  getUserDetails(id){
    this.user = this.db.object(`/users/${id}`);
    return this.db.object(`/users/${id}`);
  }

  getListings(){
    return this.listings;
  }

  getListingDetails(id){
    this.listing = this.db.object('/listings/'+id) as FirebaseObjectObservable<Listing>
    return this.listing;
  }

  addListing(listing){
    // Create root ref
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        return this.listings.push(listing);
      });
    }
  }

  getDate() {
    return this.date = new Date().toISOString().slice(0,10);
  }

  updateListing(id, listing) {
    return this.listings.update(id, listing);
  }

  deleteListing(id) {
    return this.listings.remove(id);
  }

}

interface Listing{
  $key?:string;
  title?:string;
  type?:string;
  image?:string;
  place?:string;
  owner?:string;
  dateOfDetection?:string;
  dateOfFixing?:string;
  createrEmail?:string;
}

interface User{
  $key?:string;
  email?:string;
  firstname?:string;
  lastname?:string;
  patronymic?:string;
  subsidiary?:string;
  tabNumber?:string;
}