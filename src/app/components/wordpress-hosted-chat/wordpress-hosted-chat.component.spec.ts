import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordpressHostedChatComponent } from './wordpress-hosted-chat.component';

describe('WordpressChatComponent', () => {
  let component: WordpressHostedChatComponent;
  let fixture: ComponentFixture<WordpressHostedChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordpressHostedChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordpressHostedChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
