import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ate-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  @Input() count = 0;

  @Output() countChange = new EventEmitter<number>();

  increment(): void {
    this.count += 1;

    this.emitCountChange();
  }

  decrement(): void {
    this.count -= 1;

    this.emitCountChange();
  }

  reset(value: string): void {
    this.count = +value;

    this.emitCountChange();
  }

  private emitCountChange(): void {
    this.countChange.emit(this.count);
  }
}
