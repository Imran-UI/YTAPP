import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YTIframeComponent } from './ytiframe.component';

describe('YTIframeComponent', () => {
  let component: YTIframeComponent;
  let fixture: ComponentFixture<YTIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YTIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YTIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
