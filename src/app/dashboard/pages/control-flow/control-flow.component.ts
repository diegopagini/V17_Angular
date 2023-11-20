import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-flow.component.html',
  styles: ``,
})
export default class ControlFlowComponent {
  showContent = signal(false);

  toggleShowContent(): void {
    this.showContent.update((value: boolean) => !value);
  }
}
