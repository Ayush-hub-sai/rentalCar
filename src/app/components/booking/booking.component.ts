import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {


  locationId: string = ''
  locationList: any[] = []
  fromLocation: string = ''
  toLocation: string = ''
  carIdData: string = ''
  carDetails: any

  carObj: any = {
    "bookingId": 0,
    "customerId": 0,
    "fromLocationId": 0,
    "toLocationId": 0,
    "travelDate": "2023-12-11T10:02:23.939Z",
    "startTime": "",
    "carId": 0,
    "pickupAddress": "",
    "alternateContactNo": "",
    "invoiceNo": "",
    "isComplete": true
  }
  loginObj: any = []

  constructor(private activateUrl: ActivatedRoute, private _carService: CarService, private router: Router) {
    this.activateUrl.params.subscribe((res: any) => {
      this.locationId = res.locationId
      this.carIdData = res.carId
      this.carObj.carId = this.carIdData
      // this.getCarByLocationId()
      this.getCarById()
    })
  }

  ngOnInit(): void {
    this.getAllLocation()
    let loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      this.loginObj = JSON.parse(loggedUser)
      this.carObj.customerId = this.loginObj.userId
    }
  }

  getCarById() {
    this._carService.getCarById(this.carIdData).subscribe((res: any) => {
      this.carDetails = res.data
    })
  }

  creteCarBooking() {
    this._carService.createCarBooking(this.carObj).subscribe((res: any) => {
      alert(res.message)
      this.router.navigate(['/home'])
    })
  }

  getAllLocation() {
    this._carService.getAllLocation().subscribe((res: any) => {
      this.locationList = res.data
    })
  }
}
