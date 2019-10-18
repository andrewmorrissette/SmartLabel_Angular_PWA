import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressLabelComponent } from './wordpress-label.component';

describe('WordpressPostComponent', () => {
  let component: WordpressLabelComponent;
  let fixture: ComponentFixture<WordpressLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordpressLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
