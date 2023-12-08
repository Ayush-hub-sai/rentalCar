import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() openLogModal: any
  @Output() loginData: EventEmitter<any> = new EventEmitter();

  loginObj: any = {
    "name": "string",
    "userRole": "string",
    "emailId": "",
    "mobileNo": "string",
    "password": "",
    "createdOn": new Date()
  }

  constructor(private _carService: CarService, public activeModal: NgbActiveModal) {
    let loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      this.loginObj = JSON.parse(loggedUser)
    }
  }

  login(data: any) {
    this._carService.login(data).subscribe((response: any) => {
      if (response.result) {
        localStorage.setItem("loginUser", JSON.stringify(response.data))
        this.loginObj = response.data
        this.loginData.emit(this.loginObj)
        this.activeModal.close()
      }
    })
  }
}
