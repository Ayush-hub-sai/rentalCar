import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/ZoomCar/'

  public carUserDetails = new Subject<string>();
  data$ = this.carUserDetails.asObservable();

  constructor(private http: HttpClient) {
  }

  updateData(newValue: string) {
    this.carUserDetails.next(newValue);
  }

  register(obj: any) {
    return this.http.post(this.apiUrl + 'AddNewUser', obj)
  }

  login(obj: any) {
    return this.http.post(this.apiUrl + 'Login', obj)
  }

  addNewCar(obj: any) {
    return this.http.post(this.apiUrl + 'addNewCar', obj)
  }

  getAllCarByUser(userId: any) {
    return this.http.get(this.apiUrl + `GetAllCarsByOwnerId?id=${userId}`);
  }

  getAllLocation() {
    return this.http.get(this.apiUrl + 'GetAllLocations');
  }

  getAllCar() {
    return this.http.get(this.apiUrl + 'GetAllCars');
  }

  getCarByLocationId(locationId: string) {
    return this.http.get(this.apiUrl + 'GetAllCarsByLocation?id=' + locationId);
  }

  getCarById(carId: string) {
    return this.http.get(this.apiUrl + 'GetCarById?id=' + carId);
  }

  createCarBooking(carObj: any) {
    return this.http.post(this.apiUrl + 'createNewBooking', carObj);
  }


}
