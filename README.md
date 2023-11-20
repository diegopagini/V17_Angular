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
