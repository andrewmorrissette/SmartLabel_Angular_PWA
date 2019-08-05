import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressChatComponent } from './wordpress-chat.component';

describe('WordpressChatComponent', () => {
  let component: WordpressChatComponent;
  let fixture: ComponentFixture<WordpressChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordpressChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
