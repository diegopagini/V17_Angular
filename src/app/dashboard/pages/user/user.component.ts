import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);
  user = toSignal(
    this.route.params.pipe(
      switchMap(({ id }: Params) => this.usersService.getUserById(id))
    )
  );
  fullName = computed(() => {
    if (this.user())
      return `User: ${this.user()?.first_name} ${this.user()?.last_name}`;

    return 'Loading user...';
  });
}
