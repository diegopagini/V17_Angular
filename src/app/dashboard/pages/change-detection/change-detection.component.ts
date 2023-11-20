import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TitleComponent],
  template: `
    <app-title title="Change Detection" />
    <!-- Signal -->
    <pre
      >{{ frameworkHasSignal() | json }}
    </pre
    >
    <!-- Property -->
    <pre
      >{{ frameworkHasProperty | json }}
    </pre
    >
  `,
})
export default class ChangeDetectionComponent {
  frameworkHasSignal = signal({
    name: 'Angular',
    releaseDate: 2016,
  });

  frameworkHasProperty = {
    name: 'Angular',
    releaseDate: 2016,
  };

  constructor() {
    setTimeout(() => {
      // With ChangeDetectionStrategy.OnPush the change will not be visible
      // this.frameworkHasProperty.name = 'React';

      this.frameworkHasSignal.update((framework) => ({
        ...framework,
        name: 'React',
      }));

      console.log('Done');
    }, 3000);
  }
}
