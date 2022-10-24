import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelDataCleansingComponent } from './excel-data-cleansing.component';

describe('ExcelDataCleansingComponent', () => {
  let component: ExcelDataCleansingComponent;
  let fixture: ComponentFixture<ExcelDataCleansingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelDataCleansingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelDataCleansingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
