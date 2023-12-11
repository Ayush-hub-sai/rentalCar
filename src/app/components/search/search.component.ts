import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
  availableCar: any = []

  constructor(private activateUrl: ActivatedRoute,
    private _carService: CarService,
    private router: Router,
    private spinner: NgxSpinnerService) {
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

  getCarByLocationId() {
    this.spinner.show()
    this._carService.getCarByLocationId(this.locationId).subscribe((res: any) => {
      this.availableCar = res.data
      this.spinner.hide()
    })
  }

  changeLocation() {
    this.spinner.show()
    this._carService.getCarByLocationId(this.fromLocation).subscribe((res: any) => {
      this.availableCar = res.data
      this.spinner.hide()
    })
  }

  carBooking(carId: string) {
    this.spinner.show()
    this.router.navigate(['/booking', this.fromLocation, carId])
  }

}
