import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MockComponent } from 'ng-mocks';

import { CounterComponent } from '../../components/counter/counter.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let componentFixture: ComponentFixture<HomeComponent>;
  let counterComponent: CounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MockComponent(CounterComponent)],
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
    counterComponent = componentFixture.debugElement.query(
      By.directive(CounterComponent)
    ).componentInstance;
    componentFixture.detectChanges();
  });

  it('should be component exists', () => {
    expect(component).toBeInstanceOf(HomeComponent);
  });

  it('should be render counter component', () => {
    expect(counterComponent).toBeTruthy();
  });

  it('should be pass count to the counter component', () => {
    component.count = 10;
    componentFixture.detectChanges();

    expect(counterComponent.count).toEqual(10);
  });

  it('should be get events from countChange', () => {
    jest.spyOn(console, 'log');

    counterComponent.countChange.emit(200);

    expect(console.log).toHaveBeenCalledWith(200);
  });
});
