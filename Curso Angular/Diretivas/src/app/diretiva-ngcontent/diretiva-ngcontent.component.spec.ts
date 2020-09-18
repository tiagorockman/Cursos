import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiretivaNgcontentComponent } from './diretiva-ngcontent.component';

describe('DiretivaNgcontentComponent', () => {
  let component: DiretivaNgcontentComponent;
  let fixture: ComponentFixture<DiretivaNgcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiretivaNgcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiretivaNgcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
