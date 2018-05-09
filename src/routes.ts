import { Routes } from '@angular/router';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { HomeComponent } from './app/home/home.component';
import { ListingsComponent } from './app/listings/listings.component';
import { ListingComponent } from './app/listing/listing.component';
import { AddListingComponent } from './app/add-listing/add-listing.component';
import { EditListingComponent } from './app/edit-listing/edit-listing.component';

export const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'home', component:HomeComponent},
    {path: 'listings', component:ListingsComponent},
    {path:'listing/:id', component:ListingComponent},
    {path: 'add-listing', component:AddListingComponent},
    {path: 'edit-listing/:id', component:EditListingComponent},
    { path:'', component:HomeComponent},
];