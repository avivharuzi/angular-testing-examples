import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CounterComponent } from '../../components/counter/counter.component';
import { HomeComponent } from './home.component';

@Component({
  selector: 'ate-counter',
  template: '',
})
class FakeCounterComponent implements Partial<CounterComponent> {
  @Input() count = 0;

  @Output() countChange = new EventEmitter<number>();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let componentFixture: ComponentFixture<HomeComponent>;

  const getCounterComponent = (): FakeCounterComponent => {
    return componentFixture.debugElement.query(
      By.directive(FakeCounterComponent)
    ).componentInstance;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, FakeCounterComponent],
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

    expect(getCounterComponent().count).toEqual(10);
  });

  it('should be get events from countChange', () => {
    jest.spyOn(console, 'log');

    getCounterComponent().countChange.emit(200);

    expect(console.log).toHaveBeenCalledWith(200);
  });
});
