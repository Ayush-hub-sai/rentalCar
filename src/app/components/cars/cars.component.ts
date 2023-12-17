import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/services/car.service';
import { AddCarComponent } from 'src/app/shared/add-car/add-car.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  loginObj: any = {}
  carList: any[] = []
  userId: any
  carObj: any = {
    "carId": 0,
    "brand": "",
    "name": "",
    "pricingDescription": "",
    "pricing": 0,
    "locationId": 0,
    "registeredOn": new Date,
    "imageUrl": "",
    "vehicleNo": "",
    "ownerUserId": 0,
    "ZoomCarAccessoriess": []
  }

  accessoriesObj: any = {
    "accessoriesId": 0,
    "accessoriesTitle": "",
    "showOnWebsite": false,
    "carId": 0
  }

  constructor(private carService: CarService, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    let loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      this.loginObj = JSON.parse(loggedUser)
      this.getCarByOwer()
    }
  }

  AddNewCarModal() {
    const modalRef = this.modalService.open(AddCarComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.addNewCar = true
    modalRef.componentInstance.carObjModal = this.carObj
    modalRef.componentInstance.carAccModal = this.accessoriesObj
    modalRef.result.then((res: any) => {
      this.getCarByOwer()
    })
  }

  getCarByOwer() {
    this.carService.getAllCarByUser(this.loginObj.userId).subscribe((res: any) => {
      console.log(res.data);

      this.carList = res.data
    })
  }


}
