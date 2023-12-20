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

  getAllCar() {
    return this.http.get(this.apiUrl + 'GetAllCars');
  }

  getAllCarByUser(userId: any) {
    return this.http.get(this.apiUrl + `GetAllCarsByOwnerId?id=${userId}`);
  }

  getCarByLocationId(locationId: string) {
    return this.http.get(this.apiUrl + 'GetAllCarsByLocation?id=' + locationId);
  }

  getCarById(carId: string) {
    return this.http.get(this.apiUrl + 'GetCarById?id=' + carId);
  }

  addNewCar(obj: any) {
    return this.http.post(this.apiUrl + 'addNewCar', obj)
  }

  UpdateCar(obj: any) {
    return this.http.post(this.apiUrl + 'UpdateCar', obj)
  }

  deleteCarById(carId: string) {
    return this.http.get(this.apiUrl + 'DeleteCarById?id=' + carId);
  }

  getAllLocation() {
    return this.http.get(this.apiUrl + 'GetAllLocations');
  }

  // /AddBulkLocations

  // DeleteLocationById?id=8

  // GetAllUsers

  // GetUserByUserId?userId=1

  login(obj: any) {
    return this.http.post(this.apiUrl + 'Login', obj)
  }

  register(obj: any) {
    return this.http.post(this.apiUrl + 'AddNewUser', obj)
  }

  UpdateUser(obj: any) {
    return this.http.put(this.apiUrl + 'UpdateUser', obj)
  }

  // DeleteUserByUserId?userId=9

  // GetAllBookings

  // GetAllBookingsByCarId?carid=3

  getAllBookingByCarId(carId: any) {
    return this.http.get(this.apiUrl + 'GetAllBookingsByCarId?carid=' + carId);
  }

  getAllBookingByCustomerId(customerid: any) {
    return this.http.get(this.apiUrl + 'GetAllBookingsByCustomerId?customerid=' + customerid);
  }
  // GetBookingById?id=2

  createCarBooking(carObj: any) {
    return this.http.post(this.apiUrl + 'createNewBooking', carObj);
  }

  // updateBooking

  // DeleteBookingById?id=1

  // GetAllReviewByCarId?carid=1

  // AddReview


}
