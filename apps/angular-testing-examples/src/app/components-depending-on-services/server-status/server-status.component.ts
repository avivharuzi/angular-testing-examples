import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable } from 'rxjs';

import { ServerStatus } from './server-status';
import { ServerStatusService } from './server-status.service';

@Component({
  selector: 'ate-server-status',
  templateUrl: './server-status.component.html',
  styleUrls: ['./server-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerStatusComponent {
  constructor(private readonly serverStatusService: ServerStatusService) {}

  get status$(): Observable<ServerStatus> {
    return this.serverStatusService.status$;
  }
}
