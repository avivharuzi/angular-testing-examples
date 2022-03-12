import 'jest-preset-angular/setup-jest';
import { ngMocks } from 'ng-mocks';

/**
 * All methods in mock declarations and providers
 * will be automatically spied on their creation.
 * https://ng-mocks.sudo.eu/extra/auto-spy
 */
ngMocks.autoSpy('jest');
