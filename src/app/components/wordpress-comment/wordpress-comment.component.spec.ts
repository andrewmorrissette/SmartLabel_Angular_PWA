import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressCommentComponent } from './wordpress-comment.component';

describe('WordpressCommentComponent', () => {
  let component: WordpressCommentComponent;
  let fixture: ComponentFixture<WordpressCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordpressCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
