import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-common-car',
  templateUrl: './common-car.component.html',
  styleUrls: ['./common-car.component.css']
})
export class CommonCarComponent implements OnInit {
  @Input() carListFromParent: any;

  constructor() {

  }
  
  ngOnInit(): void {

  }

}
