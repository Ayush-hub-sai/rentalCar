import { Component } from '@angular/core';
import { CarService } from './services/car.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModalComponent } from './shared/common-modal/common-modal.component';
import { RegistrationComponent } from './shared/registration/registration.component';
import { LoginComponent } from './shared/login/login.component';

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

  constructor(private _carService: CarService, private modalService: NgbModal) {
    let loggedUser = localStorage.getItem('loginUser')
    if (loggedUser) {
      this.loginObj = JSON.parse(loggedUser)
    }
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
        console.log(this.loginObj.emailId);
      }
    })
  }

  LogOut() {
    localStorage.removeItem("loginUser")
    this.loginObj.emailId = ''
  }


}
