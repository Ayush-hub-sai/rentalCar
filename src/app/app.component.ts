import { Component } from '@angular/core';
import { CarService } from './services/car.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from './shared/common-modal/common-modal.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { LoginComponent } from './shared/login/login.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zoomcar';

  loginObj: any = {
    "emailId": ''
  }

  constructor(private _carService: CarService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService) {
    let loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      this.loginObj = JSON.parse(loggedUser)
    }

    this._carService.data$.subscribe((newValue) => {
      this.loginObj = newValue;
    });

  }

  registerModal() {
    const modalRef = this.modalService.open(RegistrationComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.openRegModal = true;
  }

  loginModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.openLogModal = true;

    modalRef.componentInstance.loginData.subscribe((res: any) => {
      if (res) {
        this.loginObj.emailId = res.emailId
      }
    })
  }

  LogOut() {
    this.spinner.show()
    localStorage.removeItem("loginUser")
    this.loginObj.emailId = ''
    this.router.navigate(['/home'])
    this.spinner.hide()
  }


}
