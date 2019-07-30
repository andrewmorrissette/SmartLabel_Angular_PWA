import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumShowListComponent } from './museum-show-list.component';

describe('MuseumShowListComponent', () => {
  let component: MuseumShowListComponent;
  let fixture: ComponentFixture<MuseumShowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuseumShowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseumShowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
