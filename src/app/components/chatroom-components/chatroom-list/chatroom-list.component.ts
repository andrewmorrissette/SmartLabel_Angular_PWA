import { Component, OnInit } from '@angular/core';
import {Exhibit} from '../../../models/exhibit.model'
import {ExhibitService} from '../../../services/exhibit.service';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.less']
})
export class ChatroomListComponent implements OnInit {

  exhibits: Exhibit [];

  constructor(private exhibitService: ExhibitService) { }

  ngOnInit() {
    this.exhibitService.getExhibits().subscribe(exhibitlist=>
      {
        this.exhibits = exhibitlist;
        console.log(this.exhibits);
      })
  }

}
