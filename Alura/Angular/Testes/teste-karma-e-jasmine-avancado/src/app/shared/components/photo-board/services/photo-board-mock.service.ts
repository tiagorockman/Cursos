import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Photo } from '../interfaces/photo';
import { buildPhotoList } from '../test/build-photo-list';
import { PhotoBoardService } from './photo-board.service';

@Injectable()
export class PhotoBoardMockService extends PhotoBoardService {
  public getPhotos(): Observable<Photo[]> {
    return of(buildPhotoList());
  }
}
