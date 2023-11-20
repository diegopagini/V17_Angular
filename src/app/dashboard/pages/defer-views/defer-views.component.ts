import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeavyLoadersFastComponent } from '@shared/heavy-loaders/heavy-loaders-fast.component';
import { HeavyLoadersSlowComponent } from '@shared/heavy-loaders/heavy-loaders-slow.component';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HeavyLoadersSlowComponent,
    HeavyLoadersFastComponent,
    TitleComponent,
  ],
  templateUrl: './defer-views.component.html',
})
export default class DeferViewsComponent {}
