import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificaComponent } from './clasifica.component';

describe('ClasificaComponent', () => {
  let component: ClasificaComponent;
  let fixture: ComponentFixture<ClasificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasificaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
