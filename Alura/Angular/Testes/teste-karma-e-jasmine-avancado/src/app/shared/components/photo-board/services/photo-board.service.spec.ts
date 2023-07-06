import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoBoardService } from './photo-board.service';

const mockData = {
  api: 'http://localhost:3000/photos',
  data: [
    {
      id: 1,
      description: 'example 1',
      src: ''
    },
    {
      id: 2,
      description: 'example 2',
      src: ''
    }
  ]
};

describe(PhotoBoardService.name, () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhotoBoardService]
    }).compileComponents();

    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it(`#${PhotoBoardService.prototype.getPhotos.name} should return
    photos with description in uppercase`, done => {
      service.getPhotos().subscribe(photos => {
        expect(photos[0].description).toBe('EXAMPLE 1');
        expect(photos[1].description).toBe('EXAMPLE 2');
        done();
      });
      httpController
        .expectOne(mockData.api)
        .flush(mockData.data);
    });
});
