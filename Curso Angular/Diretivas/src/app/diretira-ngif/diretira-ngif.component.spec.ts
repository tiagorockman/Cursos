import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretiraNgifComponent } from './diretira-ngif.component';

describe('DiretiraNgifComponent', () => {
  let component: DiretiraNgifComponent;
  let fixture: ComponentFixture<DiretiraNgifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretiraNgifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretiraNgifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
