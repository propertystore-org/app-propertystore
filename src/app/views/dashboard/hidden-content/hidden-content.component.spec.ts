import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenContentComponent } from './hidden-content.component';

describe('HiddenContentComponent', () => {
  let component: HiddenContentComponent;
  let fixture: ComponentFixture<HiddenContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiddenContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
