import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  @Input() addNewCar: any
  @Input() carObjModal: any
  @Input() carAccModal: any
  @Input() _carData: any
  loginObj: any = []
  locationList: any[] = []

  constructor(private _carService: CarService, public activeModal: NgbActiveModal) {
    let loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      this.loginObj = JSON.parse(loggedUser)
    }
  }

  ngOnInit(): void {
    if (this.addNewCar) {
      this.getAllLocation()
    }
    if (this._carData != undefined) {
      this.carObjModal = this._carData
      this.carAccList = this.carObjModal.carAccessoriess
    }

  }

  getAllLocation() {
    this._carService.getAllLocation().subscribe((res: any) => {
      this.locationList = res.data
    })
  }

  carAccList: any[] = []
  tempAccessories: any[] = []
  AddAccessories(carAccModal: any) {
    if (this._carData != undefined) {
      const accElement = { ...carAccModal }
      this.carAccList.push(accElement)
    }
    else {
      this.carAccList = []
      this.tempAccessories.push(JSON.stringify(carAccModal))
      this.tempAccessories.forEach((element: any) => {
        this.carAccList.push(JSON.parse(element))
      })
    }
  }

  saveCar(carObjModal: any) {
    carObjModal.ownerUserId = this.loginObj.userId
    carObjModal.ZoomCarAccessoriess = []
    this.carAccList.forEach((element: any) => {
      carObjModal.ZoomCarAccessoriess.push(element)
    })
    if (this._carData == undefined) {
      this._carService.addNewCar(carObjModal).subscribe((res: any) => {
        if (res) {
          this.activeModal.close()
        }
      })
    }
    else {
      var carModel: any = {
        carId: carObjModal.carId,
        brand: carObjModal.brand,
        name: carObjModal.name,
        pricingDescription: carObjModal.pricingDescription,
        pricing: carObjModal.pricing,
        locationId: carObjModal.locationId,
        registeredOn: carObjModal.registeredOn,
        imageUrl: carObjModal.imageUrl,
        vehicleNo: carObjModal.vehicleNo,
        ownerUserId: carObjModal.ownerUserId,
        ZoomCarAccessoriess: carObjModal.ZoomCarAccessoriess
      }

      this._carService.UpdateCar(carModel).subscribe((res: any) => {
        if (res) {
          this.activeModal.close()
        }
      })
    }

  }

}
