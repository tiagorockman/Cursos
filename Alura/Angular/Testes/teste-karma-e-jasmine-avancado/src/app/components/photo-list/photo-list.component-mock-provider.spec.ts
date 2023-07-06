import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Photo } from 'src/app/shared/components/photo-board/interfaces/photo';
import { PhotoBoardMockService } from 'src/app/shared/components/photo-board/services/photo-board-mock.service';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';

describe(PhotoListComponent.name + ' Mock Provider', () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: PhotoBoardService,
          useClass: PhotoBoardMockService
        }]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display board when data arrives`, () => {
    fixture.detectChanges();
    const board = fixture.nativeElement
      .querySelector('app-photo-board');
    const loader = fixture.nativeElement
      .querySelector('.loader');
    expect(board).withContext('Should dislay board')
      .not.toBeNull();
    expect(loader).withContext('Should not display loader')
      .toBeNull();
  });
});
