import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { Photo } from 'src/app/shared/components/photo-board/interfaces/photo';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  public photos$: Observable<Photo[]>;
  public fa = { faCircleNotch };

  constructor(private service: PhotoBoardService) {}

  public ngOnInit(): void {
    this.photos$ = this.service.getPhotos();
  }
}
