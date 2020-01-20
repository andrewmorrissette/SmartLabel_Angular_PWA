import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressNewLabelComponent } from './wordpress-new-label.component';

describe('WordpressNewLabelComponent', () => {
  let component: WordpressNewLabelComponent;
  let fixture: ComponentFixture<WordpressNewLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordpressNewLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressNewLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
