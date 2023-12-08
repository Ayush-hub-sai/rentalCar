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
  }

  getAllLocation() {
    this._carService.getAllLocation().subscribe((res: any) => {
      this.locationList = res.data
    })
  }

  carAccList: any[] = []
  AddAccessories(carAccModal: any) {
    this.carAccList = []
    this.carObjModal.ZoomCarAccessoriess.push(JSON.stringify(carAccModal))
    const temp = this.carObjModal.ZoomCarAccessoriess
    temp.forEach((element: any) => {
      this.carAccList.push(JSON.parse(element))
    });
  }

  saveCar(carObjModal: any) {
    carObjModal.ownerUserId = this.loginObj.userId
    carObjModal.ZoomCarAccessoriess = []
    this.carAccList.forEach((element: any) => {
      carObjModal.ZoomCarAccessoriess.push(element)
    })
    this._carService.addNewCar(carObjModal).subscribe((res: any) => {
      if (res) {
        this.activeModal.close()
      }
    })

  }




}
