import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
