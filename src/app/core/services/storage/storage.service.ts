import { inject, Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly supabaseService = inject(SupabaseService);

  uploadProfilePicture(
    userId: string,
    image: Blob
  ): Observable<string | Error> {
    const bucketId = 'avatars';
    const filePath = `${userId}/${new Date().getTime()}.jpg`;

    return from(
      this.supabaseService.client.storage
        .from(bucketId)
        .upload(filePath, image, {
          cacheControl: '3600',
          upsert: true,
        })
    ).pipe(
      map((result) => {
        if (result.error) return new Error(result.error.message);

        // Step 4: Get Public URL
        const response = this.supabaseService.client.storage
          .from(bucketId)
          .getPublicUrl(result.data.path);

        return response.data.publicUrl;
      })
    );
  }

  uploadAthleteAvatar(
    athleteId: number,
    image: Blob
  ): Observable<string | Error> {
    const bucketId = 'athlete-images';
    const filePath = `${athleteId}/${new Date().getTime()}.jpg`;

    return from(
      this.supabaseService.client.storage
        .from(bucketId)
        .upload(filePath, image, {
          cacheControl: '3600',
          upsert: true,
        })
    ).pipe(
      map((result) => {
        if (result.error) return new Error(result.error.message);

        // Step 4: Get Public URL
        const response = this.supabaseService.client.storage
          .from(bucketId)
          .getPublicUrl(result.data.path);

        return response.data.publicUrl;
      })
    );
  }

  uploadTeamLogo(teamId: number, image: Blob): Observable<string | Error> {
    const bucketId = 'team-images';
    const filePath = `${teamId}/${new Date().getTime()}.jpg`;

    return from(
      this.supabaseService.client.storage
        .from(bucketId)
        .upload(filePath, image, {
          cacheControl: '3600',
          upsert: true,
        })
    ).pipe(
      map((result) => {
        if (result.error) return new Error(result.error.message);

        // Step 4: Get Public URL
        const response = this.supabaseService.client.storage
          .from(bucketId)
          .getPublicUrl(result.data.path);

        return response.data.publicUrl;
      })
    );
  }
}
