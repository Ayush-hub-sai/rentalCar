import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { LoginComponent } from 'src/app/shared/login/login.component';

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
    "travelDate": "",
    "startTime": "",
    "carId": 0,
    "pickupAddress": "",
    "alternateContactNo": "",
    "invoiceNo": "",
    "isComplete": true
  }
  loginObj: any = { emailId: '' }

  constructor(private activateUrl: ActivatedRoute,
    private _carService: CarService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
    this.activateUrl?.params?.subscribe((res: any) => {
      this.locationId = res?.locationId
      this.carIdData = res?.carId
      this.carObj.carId = this.carIdData
      this.getCarById()
    })
    this.getLocalStorage()
  }

  getLocalStorage() {
    let loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      this.loginObj = JSON.parse(loggedUser)
      this.carObj.customerId = this.loginObj.userId
    }
  }

  ngOnInit(): void {
    this.getAllLocation()
  }

  getCarById() {
    this._carService.getCarById(this.carIdData).subscribe((res: any) => {
      this.carDetails = res.data
      this.spinner.hide()
    })
  }

  creteCarBooking() {
    if (this.loginObj?.userId == undefined) {
      this.loginModal();
    } else {
      if (this.carObj.fromLocationId < 1) {
        this.toastr.error("Please Enter from Location")
        return
      }
      if (this.carObj.toLocationId < 1) {
        this.toastr.error("Please Enter To Location")
        return
      }

      if (this.carObj.travelDate == "") {
        this.toastr.error("Please Enter Travel Date")
        return
      }

      if (this.carObj.startTime == "") {
        this.toastr.error("Please Enter Start Time")
        return
      }

      if (this.carObj.pickupAddress == "") {
        this.toastr.error("Please Enter Pickup Address")
        return
      }

      if (this.carObj.alternateContactNo == "") {
        this.toastr.error("Please Enter Alt. Contact Number")
        return
      }


      else {
        this.spinner.show()
        this._carService.createCarBooking(this.carObj).subscribe((res: any) => {
          this.router.navigate(['/home']);
          this.toastr.success(res.message)
          this.spinner.hide()
        });
      }
    }
  }

  updateData(res: any) {
    this._carService.updateData(res);
  }

  loginModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.openLogModal = true;
    modalRef.componentInstance.loginData.subscribe((res: any) => {
      if (res) {
        this.updateData(res)
        this.getLocalStorage()
      }
    });
  }

  getAllLocation() {
    this._carService.getAllLocation().subscribe((res: any) => {
      this.locationList = res.data
    })
  }

}
