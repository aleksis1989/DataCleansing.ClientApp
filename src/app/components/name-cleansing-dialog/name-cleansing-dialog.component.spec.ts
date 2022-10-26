import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCleansingDialogComponent } from './name-cleansing-dialog.component';

describe('NameCleansingDialogComponent', () => {
  let component: NameCleansingDialogComponent;
  let fixture: ComponentFixture<NameCleansingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameCleansingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCleansingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
