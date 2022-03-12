import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let componentFixture: ComponentFixture<HomeComponent>;

  const getCounterComponent = () => {
    return componentFixture.debugElement.query(By.css('ate-counter'));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(HomeComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();

    componentFixture = TestBed.createComponent(HomeComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should be component exists', () => {
    expect(component).toBeInstanceOf(HomeComponent);
  });

  it('should be render counter component', () => {
    expect(getCounterComponent()).toBeTruthy();
  });

  it('should be pass count to the counter component', () => {
    component.count = 10;
    componentFixture.detectChanges();

    expect(getCounterComponent().properties['count']).toEqual(10);
  });

  it('should be get events from countChange', () => {
    jest.spyOn(console, 'log');

    getCounterComponent().triggerEventHandler('countChange', 200);

    expect(console.log).toHaveBeenCalledWith(200);
  });
});
