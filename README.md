# Angular V17

## Components

### DashboardComponent

If the component is going to be used like a page there is no need to use the selector.
Also if the component dosn't need any stylesheet there is no need to have it and use the "styles" tag instead the stylesUrl

```typescript
@Component({
  standalone: true,
  imports: [RouterModule, SidemenuComponent],
  templateUrl: "./dashboard.component.html",
  styles: ``,
})
export default class DashboardComponent {}
```

### TitleComponent

Small components

```typescript
import { CommonModule } from "@angular/common";
import { booleanAttribute, Component, Input } from "@angular/core";

@Component({
  selector: "app-title",
  standalone: true,
  imports: [CommonModule],
  template: ` <h1 class="text-3xl mb-5">{{ title }}</h1> `,
})
export class TitleComponent {
  @Input({ required: true }) title: string;
  @Input({ transform: booleanAttribute }) withShadow: boolean = false; // To use "<app-title [title]="'Control Flow'" withShadow />" the 'withShadow' attribute without the []="true"
}
```

## Control Flow

### For

```html
@for (item of menuItems; track $index) {
<a [routerLink]="item.path" routerLinkActive="bg-blue-800" class="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150">
  <div class="flex flex-col">
    <span class="text-lg font-bold leading-5 text-white">{{ item.title }}</span>
    <span class="text-sm hidden md:block text-white/50">{{ item.path }}</span>
  </div>
</a>
}
```

### If

```html
<section class="grid grid-cols-1 md:grid-cols-2 gap-3">
  <div class="bg-white rounded shadow p-10">
    <h2 class="text-2xl font-bold mb-5">if: {{ showContent() }}</h2>
    <button (click)="toggleShowContent()" class="p-2 bg-blue-500 rounded text-white">Click Me!</button>

    @if (showContent()) {
    <p>Hello World!</p>
    } @else {
    <p>*****</p>
    }
  </div>
</section>
```

### Switch

```html
<div class="bg-white rounded shadow p-10">
  <h2 class="text-2xl font-bold mb-5">Switch: {{ grade() }}</h2>

  @switch (grade()) {
  <!-- Cases -->
  @case ('A') {
  <p>90+</p>
  } @case ('B') {
  <p>70+</p>
  } @case ('F') {
  <p>Reprobate</p>
  } @default {
  <p>default</p>
  }
  <!-- End cases -->
  }
</div>
```

### For empty and options

```html
<div class="bg-white rounded shadow p-10">
  <h2 class="text-2xl font-bold mb-5">For</h2>
  <ul>
    @for (framework of frameworks(); track framework; let i = $index, first = $first, last = $last, even = $even, odd = $odd, count = $count) {
    <li
      [ngClass]="
        {
          'bg-red-100': even && !first && !last,
          'bg-purple-100': odd && !first && !last,
          'bg-blue-100': first || last,          
        }"
    >
      {{ i + 1 }}/{{ count }} - {{ framework }}
    </li>
    }
  </ul>
</div>

<div class="bg-white rounded shadow p-10">
  <h2 class="text-2xl font-bold mb-5">For empty</h2>
  <ul>
    @for (framework of frameworks2(); track $index) {
    <li>{{ framework }}</li>
    } @empty {
    <li>There is no framework</li>
    }
  </ul>
</div>
```

## ChangeDetection

```typescript
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { TitleComponent } from "@shared/title/title.component";

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
    name: "Angular",
    releaseDate: 2016,
  });

  frameworkHasProperty = {
    name: "Angular",
    releaseDate: 2016,
  };

  constructor() {
    setTimeout(() => {
      // With ChangeDetectionStrategy.OnPush the change will not be visible
      // this.frameworkHasProperty.name = 'React';

      this.frameworkHasSignal.update((framework) => ({
        ...framework,
        name: "React",
      }));

      console.log("Done");
    }, 3000);
  }
}
```

## Defer Views

### HeavyLoadersSlowComponent

```typescript
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-heavy-loaders-slow",
  standalone: true,
  imports: [CommonModule],
  template: ` <section [ngClass]="['w-full h-[600px]', cssClass]">Heavy Loader Slow</section> `,
})
export class HeavyLoadersSlowComponent {
  @Input({ required: true }) cssClass: string;

  constructor() {
    const start = Date.now();
    while (Date.now() - start < 3000) {
      // This code will block JavaScript
    }
    console.log("Loaded");
  }
}
```

### DeferViewsComponent

```typescript
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HeavyLoadersFastComponent } from "@shared/heavy-loaders/heavy-loaders-fast.component";
import { HeavyLoadersSlowComponent } from "@shared/heavy-loaders/heavy-loaders-slow.component";
import { TitleComponent } from "@shared/title/title.component";

@Component({
  standalone: true,
  imports: [CommonModule, HeavyLoadersSlowComponent, HeavyLoadersFastComponent, TitleComponent],
  templateUrl: "./defer-views.component.html",
})
export default class DeferViewsComponent {}
```

### DeferViewsComponent

```html
<app-title [title]="'Defer Views'" />

<section class="grid- grid-cols-1">
  <!-- First component -->
  @defer () {
  <app-heavy-loaders-slow cssClass="bg-blue-500" />
  } @placeholder {
  <p class="h-[600px] w-full bg-gradient-to-r from-gray-200 to-gray-400 animate-pulse text-center">Loading...</p>
  }

  <!-- Second component -->
  @defer (on viewport) {
  <!-- 'on viewport' It will cause the component not to load until it is inside the view -->
  <app-heavy-loaders-slow cssClass="bg-green-500" />
  } @placeholder {
  <p class="h-[600px] w-full bg-gradient-to-r from-gray-200 to-gray-400 animate-pulse text-center">Loading...</p>
  }

  <!-- Third component -->
  @defer (on viewport) {
  <app-heavy-loaders-slow cssClass="bg-purple-500" />
  } @placeholder {
  <p class="h-[600px] w-full bg-gradient-to-r from-gray-200 to-gray-400 animate-pulse text-center">Loading...</p>
  }
</section>
```

## Defer Options

### HeavyLoadersFastComponent

```typescript
import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-heavy-loaders-fast",
  standalone: true,
  imports: [CommonModule],
  template: `<section [ngClass]="['w-full', cssClass]">
    <ng-content></ng-content>
  </section>`,
})
export class HeavyLoadersFastComponent {
  @Input({ required: true }) cssClass: string;

  constructor() {
    console.log("HeavyLoadersFastComponent created");
  }
}
```

### DeferOptionsComponent

```typescript
import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeavyLoadersFastComponent } from "@shared/heavy-loaders/heavy-loaders-fast.component";
import { TitleComponent } from "@shared/title/title.component";

@Component({
  standalone: true,
  imports: [CommonModule, HeavyLoadersFastComponent, TitleComponent],
  templateUrl: "./defer-options.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeferOptionsComponent {}
```

### DeferOptionsComponent

```html
<app-title title="Defer Triggers" />

<section>
  <h1 class="text-xl">Interaction</h1>
  <hr class="my-2" />
  <!-- This component will be displayed upon any interaction-->
  @defer (on interaction ) {
  <app-heavy-loaders-fast cssClass="bg-blue-500 h-20">
    <span>On Interaction</span>
  </app-heavy-loaders-fast>
  } @placeholder {
  <div class="w-full h-20 bg-purple-100">Interact with me!</div>
  }
</section>

<!-- ****************************** -->

<section>
  <h1 class="text-xl">Click</h1>
  <hr class="my-2" />

  <button #btnInteraction class="p-2 bg-blue-500 hover:bg-blue-700 transition-all rounded text-white my-2">Click me!</button>
  <!-- This component will be shown only when clicking on the btnInteraction -->
  @defer ( on interaction(btnInteraction)) {
  <app-heavy-loaders-fast cssClass="bg-blue-500 h-20">
    <span>On click</span>
  </app-heavy-loaders-fast>
  } @placeholder {
  <div class="w-full h-20 bg-purple-100">Click the button!</div>
  }
</section>

<!-- ****************************** -->

<section>
  <h1 class="text-xl">Hover</h1>
  <hr class="my-2" />

  <!-- This component will be shown only when hover -->
  @defer ( on hover) {
  <app-heavy-loaders-fast cssClass="bg-blue-500 h-20">
    <span>On Hover</span>
  </app-heavy-loaders-fast>
  } @placeholder {
  <div class="w-full h-20 bg-purple-100">On Hover</div>
  }
</section>

<!-- ****************************** -->

<section>
  <h1 class="text-xl">Immediately</h1>
  <hr class="my-2" />

  <!-- This component will be shown immediately -->
  @defer ( on immediate) {
  <app-heavy-loaders-fast cssClass="bg-blue-500 h-20">
    <span>Immediately</span>
  </app-heavy-loaders-fast>
  } @placeholder {
  <div class="w-full h-20 bg-purple-100">Immediately</div>
  }
</section>

<!-- ****************************** -->

<section>
  <h1 class="text-xl">Timer</h1>
  <hr class="my-2" />

  <!-- This component will be shown after 2 seconds -->
  @defer ( on timer(2000)) {
  <app-heavy-loaders-fast cssClass="bg-blue-500 h-20">
    <span>Timer</span>
  </app-heavy-loaders-fast>
  } @placeholder {
  <div class="w-full h-20 bg-green-100">2 seconds</div>
  }
</section>

<!-- ****************************** -->

<section>
  <h1 class="text-xl">Multiple</h1>
  <hr class="my-2" />

  <!-- This component will be shown on hover or idle -->
  @defer ( on hover; prefetch on idle) {
  <app-heavy-loaders-fast cssClass="bg-blue-500 h-20">
    <span>On hover, idle</span>
  </app-heavy-loaders-fast>
  } @placeholder {
  <div class="w-full h-20 bg-blue-100">On hover, idle</div>
  }
</section>
```
