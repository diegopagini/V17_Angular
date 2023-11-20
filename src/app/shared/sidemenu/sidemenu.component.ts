import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { routes } from 'src/app/app.routes';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styles: ``,
})
export class SidemenuComponent {
  menuItems: Route[] = routes
    .map((route: Route) => route.children ?? [])
    .flat()
    .filter((route: Route) => route && route.path)
    .filter((route: Route) => !route.path?.includes(':'));
}
