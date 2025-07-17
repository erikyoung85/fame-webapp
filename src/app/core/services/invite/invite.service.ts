import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponseV1 } from '../../interfaces/api-response-v1.interface';
import { InviteInfoDtoV1 } from './dtos/invite-info.dto.v1';
import { AcceptInviteRequestDtoV1 } from './dtos/requests/accept-invite.request.dto.v1';
import { AcceptInviteResponseDtoV1 } from './dtos/responses/accept-invite.response.dto.v1';

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  static readonly localStorageKey = 'invite';
  private readonly http = inject(HttpClient);

  acceptInvite(
    request: AcceptInviteRequestDtoV1
  ): Observable<ApiResponseV1<AcceptInviteResponseDtoV1>> {
    const url = `${environment.microserviceUrl}/invite/accept`;
    return this.http.post<ApiResponseV1<AcceptInviteResponseDtoV1>>(
      url,
      request
    );
  }

  saveInviteInfo(invite: InviteInfoDtoV1): void {
    localStorage.setItem(InviteService.localStorageKey, JSON.stringify(invite));
  }

  clearInviteInfo(): void {
    localStorage.removeItem(InviteService.localStorageKey);
  }

  loadInviteInfo(): InviteInfoDtoV1 | undefined {
    const inviteJsonStr = localStorage.getItem(InviteService.localStorageKey);
    let invite: InviteInfoDtoV1 | undefined;

    try {
      invite = JSON.parse(inviteJsonStr || '{}');
    } catch (error) {
      console.error('Error parsing invite JSON:', error);
    }

    if (
      typeof invite === 'object' &&
      typeof invite.email === 'string' &&
      typeof invite.token === 'string'
    ) {
      return invite;
    }

    // invalid invite format
    return undefined;
  }
}
