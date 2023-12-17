import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CarService } from './services/car.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './shared/registration/registration.component';
import { LoginComponent } from './shared/login/login.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zoomcar';

  loginObj: any = {}

  constructor(private _carService: CarService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {

    this._carService.data$.subscribe((newValue: any) => {
      this.cdRef.detectChanges();
      this.loginObj = newValue;
    });

  }

  ngOnInit(): void {
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
        this.loginObj = res
        location.reload()
      }
    })
  }

  LogOut() {
    this.toastr.success("User logged out successfully.")
    localStorage.removeItem("loginUser")
    this.loginObj.emailId = ''
    this.router.navigate(['/home'])
    setTimeout(() => {
      location.reload()
    }, 2000);
  }

  goToMycars() {
    this.router.navigate(['/cars', this.loginObj.userId])
  }

  updateUser(loginObj: any) {
    const modalRef = this.modalService.open(RegistrationComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.openRegModal = true;
    modalRef.componentInstance.updateUser = loginObj;

  }
}
