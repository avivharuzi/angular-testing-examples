import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Observable, of } from 'rxjs';

import { Signup, SignupResponse } from './signup';
import { SignupComponent } from './signup.component';
import { SignupService } from './signup.service';

const fakeSignup: Signup = {
  plan: 'personal',
  email: 'avivharuzi@gmail.com',
  password: '123456',
  address: {
    name: 'Tel Aviv',
    country: 'Israel',
  },
  termsAndServices: true,
};

interface SetupOptions {
  signup: SignupResponse;
  isEmailTaken: boolean;
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let componentFixture: ComponentFixture<SignupComponent>;
  let spyIsEmailTaken: jest.SpyInstance;
  let spySignup: jest.SpyInstance;

  const queryById = (id: string): DebugElement => {
    return componentFixture.debugElement.query(
      By.css(`[data-test-id="${id}"]`)
    );
  };

  const getElementById = <T extends Element = HTMLElement>(id: string): T => {
    return queryById(id).nativeElement;
  };

  const setInputValue = (
    element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    value: string
  ): void => {
    element.value = value;
    const isSelect = element instanceof HTMLSelectElement;
    const event = new Event(isSelect ? 'change' : 'input');
    element.dispatchEvent(event);
  };

  const checkInput = (element: HTMLInputElement, checked: boolean): void => {
    element.checked = checked;
    const event = new Event('change');
    element.dispatchEvent(event);
  };

  const setup = async (options: Partial<SetupOptions> = {}): Promise<void> => {
    const mergedOptions: SetupOptions = {
      isEmailTaken: false,
      signup: {
        success: true,
      },
      ...options,
    };

    const signupService = {
      isEmailTaken(): Observable<boolean> {
        return of(mergedOptions.isEmailTaken);
      },
      signup(): Observable<SignupResponse> {
        return of(mergedOptions.signup);
      },
    };

    spyIsEmailTaken = jest.spyOn(signupService, 'isEmailTaken');
    spySignup = jest.spyOn(signupService, 'signup');

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: SignupService,
          useValue: signupService,
        },
      ],
    })
      .overrideComponent(SignupComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();

    componentFixture = TestBed.createComponent(SignupComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  };

  it('should be component exists', async () => {
    await setup();

    expect(component).toBeInstanceOf(SignupComponent);
  });

  const fillForm = () => {
    setInputValue(
      getElementById<HTMLInputElement>('plan-personal'),
      fakeSignup.plan
    );
    setInputValue(getElementById<HTMLInputElement>('email'), fakeSignup.email);
    setInputValue(
      getElementById<HTMLInputElement>('password'),
      fakeSignup.password
    );
    setInputValue(
      getElementById<HTMLInputElement>('address-name'),
      fakeSignup.address.name
    );
    setInputValue(
      getElementById<HTMLSelectElement>('address-country'),
      fakeSignup.address.country
    );
    checkInput(
      getElementById<HTMLInputElement>('terms-and-services'),
      fakeSignup.termsAndServices
    );
  };

  it('should be submit the form successfully', fakeAsync(async () => {
    await setup();

    fillForm();
    componentFixture.detectChanges();

    tick(1000);
    componentFixture.detectChanges();

    queryById('form').triggerEventHandler('submit', null);
    componentFixture.detectChanges();

    expect(getElementById('status').textContent).toEqual('Signup success');

    expect(spyIsEmailTaken).toHaveBeenCalledWith(fakeSignup.email);
    expect(spySignup).toHaveBeenCalledWith(fakeSignup);
  }));

  it('should be not submit form it is invalid', fakeAsync(async () => {
    await setup();

    tick(1000);

    queryById('form').triggerEventHandler('submit', null);

    expect(spyIsEmailTaken).not.toHaveBeenCalled();
    expect(spySignup).not.toHaveBeenCalled();
  }));

  it('should be handle if there is signup failure', fakeAsync(async () => {
    await setup({
      signup: {
        success: false,
      },
    });

    fillForm();

    tick(1000);

    queryById('form').triggerEventHandler('submit', null);
    componentFixture.detectChanges();

    expect(getElementById('status').textContent).toEqual('Signup error');

    expect(spyIsEmailTaken).toHaveBeenCalledWith(fakeSignup.email);
    expect(spySignup).toHaveBeenCalledWith(fakeSignup);
  }));

  it('should be the form fail if email is already taken', fakeAsync(async () => {
    await setup({
      isEmailTaken: true,
    });

    fillForm();

    tick(1000);
    componentFixture.detectChanges();

    queryById('form').triggerEventHandler('submit', null);

    expect(spyIsEmailTaken).toHaveBeenCalledWith(fakeSignup.email);
    expect(spySignup).not.toHaveBeenCalled();
  }));
});
