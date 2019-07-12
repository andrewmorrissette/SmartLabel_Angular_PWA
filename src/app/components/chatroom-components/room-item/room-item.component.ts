import { Component, OnInit, Input } from '@angular/core';
import {Exhibit} from '../../../models/exhibit.model'

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.less']
})
export class RoomItemComponent implements OnInit {

  @Input() exhibit: Exhibit;

  constructor() { }

  ngOnInit() {
    console.log("Room item component is called");
  }

}
