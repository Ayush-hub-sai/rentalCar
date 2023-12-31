import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { BookingComponent } from './components/booking/booking.component';
import { CarsComponent } from './components/cars/cars.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search/:locationId', component: SearchComponent },
  { path: 'booking/:carId', component: BookingComponent },
  { path: 'booking/:locationId/:carId', component: BookingComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars/:userId', component: CarsComponent },
  { path: 'bookingList', component: BookingListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
