import { KeyValue } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CleansingFirstNameGridModel } from 'src/app/models/cleansing-first-name-grid-model';
import { CleansingFirstNameReportModel } from 'src/app/models/cleansing-first-name-report-model';
import { CleansingFirstNameRowFilterEnum } from 'src/app/models/cleansing-first-name-row-filter-enum';
import { CleansingFirstNameSearchModel } from 'src/app/models/cleansing-first-name-search-model';
import { CleansingFirstNamseStatus } from 'src/app/models/cleansing-first-namse-status';
import { SimilarityType } from 'src/app/models/similarity-type';
import { CleansingService } from 'src/app/services/cleansing.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { NameCleansingDialogComponent } from '../name-cleansing-dialog/name-cleansing-dialog.component';

@Component({
  selector: 'app-names-for-cleansing-list',
  templateUrl: './names-for-cleansing-list.component.html',
  styleUrls: ['./names-for-cleansing-list.component.css']
})
export class NamesForCleansingListComponent implements OnInit {

  rows: CleansingFirstNameGridModel[] | undefined;
  columns: any[] = [];
  searchModel: CleansingFirstNameSearchModel = new CleansingFirstNameSearchModel();
  cleansingFirstNameReport: CleansingFirstNameReportModel = new CleansingFirstNameReportModel();

  similarityTypes: Array<KeyValue<number, string>>;
  cleansingFirstNameStatusList: Array<KeyValue<number, string>>;
  cleansingFirstNameRowFilterList: Array<KeyValue<number, string>>;
  messages: any = NGX_DATATABLE_MESSAGES;

  myForm: FormGroup;

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate: TemplateRef<any> | undefined;
  @ViewChild('headerTemplate', { static: true }) headerTemplate: TemplateRef<any> | undefined;
  @ViewChild('similarityTypeNameColor', { static: true }) similarityTypeNameColor: TemplateRef<any> | undefined;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cleansingService: CleansingService,
    private snackBarService: SnackBarService) {
    this.myForm = this.fb.group({
      firstName: [],
      similarityTypeId: [0],
      cleansingFirstNameStatusId: [CleansingFirstNamseStatus.NonProcessed],
      cleansingFirstNameRowFilter: [CleansingFirstNameRowFilterEnum.Cleansable]
    });

    this.cleansingFirstNameStatusList = [
      { key: -1, value: 'СИТЕ' },
      { key: CleansingFirstNamseStatus.NonProcessed, value: 'НЕПРОЦЕСИРАНИ' },
      { key: CleansingFirstNamseStatus.Accepted, value: 'ПРИФАТЕНИ' },
      { key: CleansingFirstNamseStatus.AcceptSuggestion, value: 'ПРИФАТЕНА СУГЕСТИЈА' },
      { key: CleansingFirstNamseStatus.AcceptSimilarity, value: 'ПРИФАТЕНО ПО СЛИЧНОСТ' },
      { key: CleansingFirstNamseStatus.AcceptPermutation, value: 'ПРИФАТЕНО ПО ПЕРМУТАЦИЈА' },
      { key: CleansingFirstNamseStatus.ManualCorrection, value: 'РАЧНА КОРЕКЦИЈА' },
      { key: CleansingFirstNamseStatus.Rejected, value: 'ОДБИЕНО ПРОЧИСТУВАЊЕ' },
    ];

    this.similarityTypes = [
      { key: 0, value: 'СИТЕ' },
      { key: SimilarityType.Weak, value: 'СЛАБА' },
      { key: SimilarityType.Medium, value: 'СРЕДНА' },
      { key: SimilarityType.Strong, value: 'СИЛНА' },
    ];

    this.cleansingFirstNameRowFilterList = [
      { key: CleansingFirstNameRowFilterEnum.Cleansable, value: 'МОЖЕ ДА СЕ ПРОЧИСТАТ' },
      { key: CleansingFirstNameRowFilterEnum.NonCleansable, value: 'НЕ МОЖЕ ДА СЕ ПРОЧИСТАТ' },
      { key: CleansingFirstNameRowFilterEnum.WithSuggestedName, value: 'СО ПРЕДЛОГ ИМЕ' },
    ];

    this.searchModel = new CleansingFirstNameSearchModel();
    this.searchModel.cleansingFirstNameStatusId = CleansingFirstNamseStatus.NonProcessed;
    this.searchModel.cleansingFirstNameRowFilter = CleansingFirstNameRowFilterEnum.Cleansable;
    this.searchModel.similarityTypeId = 0;
    this.searchModel.sortColumn = 'FirstName';
  }

  ngOnInit(): void {


    this.rows = [];
    this.columns = [
      {
        prop: 'firstName',
        name: 'ИМЕ'
      },
      {
        cellTemplate: this.similarityTypeNameColor,
        prop: 'similarityTypeName',
        name: 'ТИП НА СЛИЧНОСТ',
      },
      {
        prop: 'similarityFirstName',
        name: 'ИМЕ ПО СЛИЧНОСТ',
        width: 250
      },
      {
        prop: 'cleansingFirstNameStatusName',
        name: 'СТАТУС',
      },
      {
        cellTemplate: this.actionsTemplate,
        headerTemplate: this.headerTemplate,
        prop: 'id',
        name: '',
        minWidth: 50,
        maxWidth: 100
      }
    ];

    this.cleansingFirstNameReport = new CleansingFirstNameReportModel();
    this.getCleansingFirstNameReport();

    this.pageCallback({ offset: 0 });
  }

  pageCallback(pageInfo: any) {
    if (this.searchModel) {
      this.searchModel.pageNumber = pageInfo.offset + 1;
    }

    this.reloadTable();
  }

  reloadTable() {
    this.cleansingService.filterCleansingFirstNamesInGrid(this.searchModel)
      .subscribe(pagedData => {
        if (pagedData) {
          this.searchModel = pagedData.page as CleansingFirstNameSearchModel;
          this.rows = pagedData.data;
        }
      });
  }

  sortCallback(sortInfo: { sorts: { dir: string, prop: string }[], column: {}, prevValue: string, newValue: string }) {
    if (this.searchModel) {
      this.searchModel.sortOrder = sortInfo.sorts[0].dir;
      this.searchModel.sortColumn = sortInfo.sorts[0].prop;
      this.searchModel.pageNumber = 1;
      this.reloadTable();
    }
  }

  getCleansingFirstNameReport() {
    this.cleansingService.getCleansingFirstNameReport()
      .subscribe(response => {
        this.cleansingFirstNameReport = response;
      });
  }

  similarityColor(similarityTypeId?: number) {
    if (similarityTypeId) {
      switch (similarityTypeId) {
        case SimilarityType.Weak:
          return '#9e0000';
        case SimilarityType.Medium:
          return '#ada80a';
        case SimilarityType.Strong:
          return '#006900';
        default: '#9e0000';
      }
    }
    return ''
  }

  processFirstNameCleansing(id: number) {
    const dialogRef1 = this.dialog.open(NameCleansingDialogComponent, {
      width: '40%',
      disableClose: true,
      data: {
        cleansingFirstNameId: id,
      },
      autoFocus: false
    });

    dialogRef1.afterClosed().subscribe(result => {
      if (result) {
        this.snackBarService.openSuccess('Улицата е успешно прочистена.');
      }

      this.filter();
      this.getCleansingFirstNameReport();
    });
  }

  undoMergeFirstName(id: number) {
    
  }

  filter() {
    if (this.myForm != null) {
      this.searchModel.firstName = this.myForm.controls['firstName'].value;
      this.searchModel.similarityTypeId = this.myForm.controls['similarityTypeId'].value;
      this.searchModel.cleansingFirstNameStatusId = this.myForm.controls['cleansingFirstNameStatusId'].value;
      this.searchModel.cleansingFirstNameRowFilter = this.myForm.controls['cleansingFirstNameRowFilter'].value;

      this.pageCallback({ offset: 0 });
    }
  }

  resetFilter() {
    if (this.myForm != null) {
      this.myForm.reset();

      this.myForm.controls['similarityTypeId'].setValue(0);
      this.myForm.controls['cleansingFirstNameStatusId'].setValue(CleansingFirstNamseStatus.NonProcessed);
      this.myForm.controls['cleansingFirstNameRowFilter'].setValue(CleansingFirstNameRowFilterEnum.Cleansable);

      this.filter();
    }

  }

}

export const NGX_DATATABLE_MESSAGES = {
  // Message to show when array is presented
  // but contains no values
  emptyMessage: 'Нема податоци за приказ ...',

  // Footer total message
  totalMessage: 'Вкупно',

  // Footer selected message
  selectedMessage: 'Селектирано'
};

