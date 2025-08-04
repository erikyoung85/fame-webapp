import { inject, Injectable } from '@angular/core';
import { FileViewer } from '@capacitor/file-viewer';
import { Filesystem } from '@capacitor/filesystem';
import { from, map, Observable } from 'rxjs';
import { FilePickerFile } from 'src/app/shared/components/form-file-picker/form-file-picker.component';
import { b64toBlob } from 'src/app/shared/utils/b64-to-blob.util';
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

  async uploadRafflePrize(
    raffleId: number,
    videoFile: FilePickerFile
  ): Promise<string | Error> {
    const bucketId = 'raffle-prizes';
    const s3FilePath = `${raffleId}/${videoFile.name}`;

    // Step 1: Get signed URL from Supabase
    const signedUrlRes = await this.supabaseService.client.storage
      .from(bucketId)
      .createSignedUploadUrl(s3FilePath, { upsert: true });

    if (signedUrlRes.error !== null) {
      throw new Error('Failed to get signed URL');
    }

    console.log('Signed URL response:', signedUrlRes);

    // Step 2: Read the local video file
    const fileBlob = await Filesystem.readFile({
      path: videoFile.url,
    })
      .then((file) =>
        typeof file.data === 'string' ? b64toBlob(file.data) : file.data
      )
      .catch(() => new Error('Failed to read local video file'));

    console.log('File blob:', fileBlob);

    if (fileBlob instanceof Error) {
      return fileBlob;
    }

    // Step 3: Upload the file to the signed URL
    const uploadRes = await this.supabaseService.client.storage
      .from(bucketId)
      .uploadToSignedUrl(
        signedUrlRes.data.path,
        signedUrlRes.data.token,
        fileBlob
      )
      .catch(() => new Error('Failed to upload file'));

    console.log('Upload result:', uploadRes);

    if (uploadRes instanceof Error || uploadRes.data === null)
      return new Error('Failed to upload file');

    // Step 4: Get Public URL
    const publicUrlRes = this.supabaseService.client.storage
      .from(bucketId)
      .getPublicUrl(uploadRes.data.path);

    console.log('Public URL:', publicUrlRes.data.publicUrl);

    return publicUrlRes.data.publicUrl;
  }

  async previewRafflePrize(prizeVideoUrl: string): Promise<void> {
    const bucketId = 'raffle-prizes';

    const filePath = prizeVideoUrl.split(bucketId)[1];
    console.log('File path:', filePath);

    const response = await this.supabaseService.client.storage
      .from(bucketId)
      .createSignedUrl(filePath, 5 * 60); // 5 minutes

    if (response.error) {
      console.error('Error getting raffle prize signed URL:', response.error);
      return;
    }

    const signedUrl = response.data.signedUrl;
    await FileViewer.previewMediaContentFromUrl({
      url: signedUrl,
    });
  }
}
