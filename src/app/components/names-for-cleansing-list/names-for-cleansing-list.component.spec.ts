import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamesForCleansingListComponent } from './names-for-cleansing-list.component';

describe('NamesForCleansingListComponent', () => {
  let component: NamesForCleansingListComponent;
  let fixture: ComponentFixture<NamesForCleansingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NamesForCleansingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesForCleansingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
