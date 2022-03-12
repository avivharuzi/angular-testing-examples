import { NgModule } from '@angular/core';

import { CounterModule } from '../../components/counter/counter.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CounterModule],
})
export class HomeModule {}
