import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PhotoBoardmodule } from 'src/app/shared/components/photo-board/photo-board.module';
import { PhotoListComponent } from './photo-list.component';

@NgModule({
  declarations: [PhotoListComponent],
  imports: [
    CommonModule,
    PhotoBoardmodule,
    FontAwesomeModule
  ],
  exports: [PhotoListComponent]
})
export class PhotoListModule {}
