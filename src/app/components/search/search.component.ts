import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  locationId: string = ''
  locationList: any[] = []
  fromLocation: string = ''
  toLocation: string = ''

  constructor(private activateUrl: ActivatedRoute, private _carService: CarService, private router: Router) {
    this.activateUrl.params.subscribe((res: any) => {
      this.locationId = res.locationId
      this.fromLocation = this.locationId
      this.getCarByLocationId()
    })
  }

  ngOnInit(): void {
    this.getAllLocation()
  }

  getAllLocation() {
    this._carService.getAllLocation().subscribe((res: any) => {
      this.locationList = res.data
    })
  }

  availableCar: any = []
  getCarByLocationId() {
    this._carService.getCarByLocationId(this.locationId).subscribe((res: any) => {
      this.availableCar = res.data
    })
  }

  changeLocation() {
    this._carService.getCarByLocationId(this.fromLocation).subscribe((res: any) => {
      this.availableCar = res.data
    })
  }

  carBooking(carId: string) {
    this.router.navigate(['/booking', this.fromLocation, carId])
  }

}
