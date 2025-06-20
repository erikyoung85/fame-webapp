import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  numberAttribute,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonProgressBar,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { filter, Subject, switchMap, take, takeUntil } from 'rxjs';
import { FormActionRoutes, PageRoutes } from 'src/app/app.routes';
import { AsyncDataStatus } from 'src/app/core/models/AsyncData.model';
import { UpdateTeamRequestDtoV1 } from 'src/app/core/services/teams/dtos/requests/update-team.request.dto.v1';
import { RouterActions } from 'src/app/core/store/router/actions/router.actions';
import { teamsActions } from 'src/app/core/store/teams/actions/teams.actions';
import { teamsFeature } from 'src/app/core/store/teams/feature/teams.feature';
import { ToolbarTextButtonComponent } from 'src/app/shared/components/toolbar-text-button/toolbar-text-button.component';
import { UserProfileAvatarComponent } from 'src/app/shared/components/user-profile-avatar/user-profile-avatar.component';
import { IsAsyncLoadingPipe } from 'src/app/shared/pipes/is-async-loading/is-async-loading.pipe';
import { UnwrapAsyncPipe } from 'src/app/shared/pipes/unwrap-async/unwrap-async.pipe';

@Component({
  templateUrl: './team-detail-edit.page.html',
  styleUrls: ['./team-detail-edit.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonProgressBar,
    IonContent,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    CommonModule,
    LetDirective,
    UnwrapAsyncPipe,
    IsAsyncLoadingPipe,
    ToolbarTextButtonComponent,
    UserProfileAvatarComponent,
    ReactiveFormsModule,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
  ],
})
export class TeamDetailEditPage implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  private readonly store = inject(Store);
  private readonly fb = inject(NonNullableFormBuilder);

  readonly teamId = input.required({ transform: numberAttribute });

  readonly teamDetails$ = toObservable(this.teamId).pipe(
    filter((teamId) => teamId !== undefined),
    switchMap((teamId) => {
      this.store.dispatch(teamsActions.fetchTeamDetails({ teamId: teamId }));
      return this.store.select(teamsFeature.selectTeamDetails(teamId));
    })
  );

  readonly form = this.fb.group({
    logoUrl: this.fb.control<string | undefined>(undefined),
  });

  ngOnInit(): void {
    this.form.disable();

    this.teamDetails$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((async) => async?.status === AsyncDataStatus.Success),
        take(1)
      )
      .subscribe((async) => {
        const teamDetails = async?.data;
        if (teamDetails === undefined) return;

        const formValues: ReturnType<typeof this.form.getRawValue> = {
          logoUrl: teamDetails.logoUrl,
        };
        this.form.patchValue(formValues);
        this.form.enable();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSaveClicked() {
    if (this.form.invalid) return;

    const request: UpdateTeamRequestDtoV1 = {
      id: this.teamId(),
      logo_url: this.form.value.logoUrl ?? null,
    };
    this.store.dispatch(teamsActions.updateTeam({ request: request }));
  }

  onCancelClicked() {
    this.store.dispatch(
      RouterActions.routeInCurrentTab({
        url: [PageRoutes.TeamDetail, this.teamId(), FormActionRoutes.View],
        animated: false,
        replaceUrl: true,
      })
    );
  }
}
