import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private _carService: CarService,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    ) {

  }
  register(data: any) {
    this.spinner.show();
    this._carService.register(data).subscribe((response: any) => {
      if (response.result) {
        this.activeModal.close()
        this.spinner.hide()
        this.toastr.success(response.message)
      }
    })
  }

}
