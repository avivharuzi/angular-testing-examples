import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { take, toArray } from 'rxjs';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let componentFixture: ComponentFixture<CounterComponent>;

  const getCountElement = (): HTMLElement => {
    return componentFixture.debugElement.query(By.css('[data-test-id="count"]'))
      .nativeElement;
  };

  const getIncrementButtonElement = (): HTMLButtonElement => {
    return componentFixture.debugElement.query(
      By.css('[data-test-id="increment-button"]')
    ).nativeElement;
  };

  const getDecrementButtonElement = (): HTMLButtonElement => {
    return componentFixture.debugElement.query(
      By.css('[data-test-id="decrement-button"]')
    ).nativeElement;
  };

  const getResetInputElement = (): HTMLInputElement => {
    return componentFixture.debugElement.query(
      By.css('[data-test-id="reset-input"]')
    ).nativeElement;
  };

  const getResetButtonElement = (): HTMLButtonElement => {
    return componentFixture.debugElement.query(
      By.css('[data-test-id="reset-button"]')
    ).nativeElement;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    })
      .overrideComponent(CounterComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();

    componentFixture = TestBed.createComponent(CounterComponent);
    component = componentFixture.componentInstance;
    component.count = 0;
    componentFixture.detectChanges();
  });

  it('should be component exists', () => {
    expect(component).toBeInstanceOf(CounterComponent);
  });

  it('should be count with default value', () => {
    expect(getCountElement().textContent).toEqual('0');
  });

  it('should be count value updated', () => {
    component.count = 10;
    componentFixture.detectChanges();

    expect(getCountElement().textContent).toEqual('10');
  });

  it('should be increment the count', () => {
    getIncrementButtonElement().click();
    componentFixture.detectChanges();

    expect(getCountElement().textContent).toEqual('1');

    getIncrementButtonElement().click();
    getIncrementButtonElement().click();
    componentFixture.detectChanges();

    expect(getCountElement().textContent).toEqual('3');
  });

  it('should be decrement the count', () => {
    getDecrementButtonElement().click();
    componentFixture.detectChanges();

    expect(getCountElement().textContent).toEqual('-1');

    getDecrementButtonElement().click();
    getDecrementButtonElement().click();
    componentFixture.detectChanges();

    expect(getCountElement().textContent).toEqual('-3');
  });

  it('should be reset the count', () => {
    getResetInputElement().value = '100';
    getResetButtonElement().click();
    componentFixture.detectChanges();

    expect(getCountElement().textContent).toEqual('100');
  });

  it('should be emit counterChange on increment', () => {
    let actualCount: number | undefined;

    component.countChange.subscribe((count) => {
      actualCount = count;
    });

    getIncrementButtonElement().click();

    expect(actualCount).toEqual(1);
  });

  it('should be emit counterChange on decrement', () => {
    let actualCount: number | undefined;

    component.countChange.subscribe((count) => {
      actualCount = count;
    });

    getDecrementButtonElement().click();

    expect(actualCount).toEqual(-1);
  });

  it('should be emit counterChange on reset', () => {
    let actualCount: number | undefined;

    component.countChange.subscribe((count) => {
      actualCount = count;
    });

    getResetInputElement().value = '90';
    getResetButtonElement().click();

    expect(actualCount).toEqual(90);
  });

  it('should emit countChange events', () => {
    let actualCounts: number[] = [];

    component.countChange.pipe(take(3), toArray()).subscribe((counts) => {
      actualCounts = counts;
    });

    getIncrementButtonElement().click();
    getDecrementButtonElement().click();
    getResetInputElement().value = '50';
    getResetButtonElement().click();

    expect(actualCounts).toEqual([1, 0, 50]);
  });
});
