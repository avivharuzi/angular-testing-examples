import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ServerStatusComponent } from './server-status.component';
import { ServerStatusService } from './server-status.service';

@NgModule({
  declarations: [ServerStatusComponent],
  imports: [CommonModule],
  providers: [ServerStatusService],
})
export class ServerStatusModule {}
