import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

import { MockProvider } from 'ng-mocks';

import { ServerStatus } from './server-status';
import { ServerStatusComponent } from './server-status.component';
import { ServerStatusService } from './server-status.service';

describe('ServerStatusComponent', () => {
  let component: ServerStatusComponent;
  let componentFixture: ComponentFixture<ServerStatusComponent>;

  const getStatusElement = (): HTMLDivElement => {
    return componentFixture.debugElement.query(
      By.css('[data-test-id="status"]')
    ).nativeElement;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServerStatusComponent],
      providers: [
        MockProvider(ServerStatusService, {
          get status$(): Observable<ServerStatus> {
            return of('up');
          },
        }),
      ],
    }).compileComponents();

    componentFixture = TestBed.createComponent(ServerStatusComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should be component exists', () => {
    expect(component).toBeInstanceOf(ServerStatusComponent);
  });

  it('should be with correct status', () => {
    expect(getStatusElement().textContent).toEqual('up');
  });
});
