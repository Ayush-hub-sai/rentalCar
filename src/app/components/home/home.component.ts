import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicCarList: any[] = []
  locationList: any[] = []
  fromLocation: string = ''
  toLocation: string = ''

  constructor(private _carService: CarService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCar()
    this.getAllLocation()
  }

  getAllCar() {
    this._carService.getAllCar().subscribe((res: any) => {
      console.log(res);

      this.publicCarList = res.data
    })
  }

  getAllLocation() {
    this._carService.getAllLocation().subscribe((res: any) => {
      this.locationList = res.data
    })
  }

  getCarBySearch() {
    this.router.navigate(['/search', this.fromLocation])
  }


  carBooking(carId: string) {
    this.router.navigate(['/booking', this.fromLocation, carId])
  }
}
