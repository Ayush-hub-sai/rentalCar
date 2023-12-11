import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(private _carService: CarService,
    private router: Router,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getAllCar()
    this.getAllLocation()
  }

  getAllCar() {
    this.spinner.show()
    this._carService.getAllCar().subscribe((res: any) => {
      this.spinner.hide()
      this.publicCarList = res.data
    })
  }

  getAllLocation() {
    this._carService.getAllLocation().subscribe((res: any) => {
      this.locationList = res.data
    })
  }

  getCarBySearch() {
    this.spinner.show()
    this.router.navigate(['/search', this.fromLocation])
  }


  carBooking(carId: string) {
    this.spinner.show()
    this.router.navigate(['/booking', carId])
  }
}
