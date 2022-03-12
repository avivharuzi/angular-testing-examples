import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ate-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  count = 0;

  onCountChange(count: number): void {
    console.log(count);
  }
}
