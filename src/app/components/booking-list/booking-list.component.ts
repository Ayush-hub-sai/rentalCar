import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookingList: any[] = []
  loginObj: any = {}

  ngOnInit(): void {
    let loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      this.loginObj = JSON.parse(loggedUser)
    }
    if (this.loginObj.userRole == "customer") {
      this.getAllBookingByCustomerId()
    } else {

    }
  }

  constructor(private carService: CarService) { }

  getAllBookingByCustomerId() {
    this.carService.getAllBookingByCustomerId(this.loginObj.userId).subscribe((res: any) => {
      if (res.result) {
        this.bookingList = res.data
      }
    })
  }

  getAllBookingByCarId() {
    this.carService.getAllBookingByCarId(this.loginObj.userId).subscribe((res: any) => {
      if (res.result) {
        this.bookingList = res.data
      }
    })
  }

  deleteBooking(data: any) {

  }

  updateBooking(data: any) {

  }
  
}
