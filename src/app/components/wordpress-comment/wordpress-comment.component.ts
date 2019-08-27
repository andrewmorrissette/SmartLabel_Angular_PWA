import { Component, OnInit, Input } from '@angular/core';
import {Comment} from '../../models/wordpress/comment.model';

@Component({
  selector: 'app-wordpress-comment',
  templateUrl: './wordpress-comment.component.html',
  styleUrls: ['./wordpress-comment.component.less']
})
export class WordpressCommentComponent implements OnInit {

  @Input() comment:Comment;
  author: string;
  messageContent: string;
  timeStamp: Date = new Date();


  constructor() { }

  ngOnInit(comment = this.comment) {
    this.messageContent = comment.content.rendered;
    this.timeStamp = comment.date;
    this.author = comment.author_name;
  }

}
