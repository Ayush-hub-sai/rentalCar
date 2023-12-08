import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @Input() openRegModal: any
  registerObj: any = {
    "userId": 0,
    "name": "",
    "userRole": "",
    "emailId": "",
    "mobileNo": "",
    "password": "",
    "createdOn": new Date()
  }

  constructor(private _carService: CarService, public activeModal: NgbActiveModal) {

  }
  register(data: any) {
    this._carService.register(data).subscribe((response: any) => {
      if (response.result) {
        this.activeModal.close()
      }
    })
  }

}
