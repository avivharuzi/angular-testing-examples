import { Injectable } from '@angular/core';

import { BehaviorSubject, delay, Observable } from 'rxjs';

import { ServerStatus } from './server-status';

@Injectable()
export class ServerStatusService {
  private readonly statusSubject = new BehaviorSubject<ServerStatus>('up');

  get status$(): Observable<ServerStatus> {
    return this.statusSubject.asObservable().pipe(delay(2000));
  }
}
