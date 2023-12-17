import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/services/car.service';
import { AddCarComponent } from '../add-car/add-car.component';

@Component({
  selector: 'app-common-car',
  templateUrl: './common-car.component.html',
  styleUrls: ['./common-car.component.css']
})
export class CommonCarComponent implements OnInit {
  @Input() carListFromParent: any;
  loginObj: any = {}

  constructor(private carService: CarService, private modalService: NgbModal) {

  }

  ngOnInit(): void {

  }

  

}
