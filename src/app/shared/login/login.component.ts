import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  constructor(private _carService: CarService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService) {
    let loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      this.loginObj = JSON.parse(loggedUser)
    }

  }

  ngOnInit(): void {
    this.spinner.hide()
  }

  login(data: any) {
    this.spinner.show();
    this._carService.login(data).subscribe((response: any) => {
      if (response.result) {
        this.spinner.hide()
        localStorage.setItem("loginUser", JSON.stringify(response.data))
        this.loginObj = response.data
        this.loginData.emit(this.loginObj)
        this.activeModal.close()
      }
    })
  }
}
