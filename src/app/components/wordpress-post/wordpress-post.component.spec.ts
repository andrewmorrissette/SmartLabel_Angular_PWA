import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressPostComponent } from './wordpress-post.component';

describe('WordpressPostComponent', () => {
  let component: WordpressPostComponent;
  let fixture: ComponentFixture<WordpressPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordpressPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
