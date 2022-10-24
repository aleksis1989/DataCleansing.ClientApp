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

@Component({
  selector: 'app-names-for-cleansing-list',
  templateUrl: './names-for-cleansing-list.component.html',
  styleUrls: ['./names-for-cleansing-list.component.css']
})
export class NamesForCleansingListComponent implements OnInit {

  rows: CleansingFirstNameGridModel[] | undefined;
  columns: any[] = [];
  searchModel: CleansingFirstNameSearchModel = new CleansingFirstNameSearchModel();
  cleansingStreetReportModel: CleansingFirstNameReportModel | undefined;

  similarityTypes: Array<KeyValue<number, string>>;
  cleansingFirstNameStatusList: Array<KeyValue<number, string>>;
  cleansingFirstNameRowFilterList: Array<KeyValue<number, string>>;
  messages: any = NGX_DATATABLE_MESSAGES;

  myForm: FormGroup | undefined;

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate: TemplateRef<any> | undefined;
  @ViewChild('headerTemplate', { static: true }) headerTemplate: TemplateRef<any> | undefined;
  @ViewChild('similarityTypeName', { static: true }) similarityTypeName: TemplateRef<any> | undefined;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cleansingService: CleansingService) {

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
      { key: CleansingFirstNameRowFilterEnum.WithSuggestedStreet, value: 'СО ПРЕДЛОГ УЛИЦА' },
    ];

    this.searchModel = new CleansingFirstNameSearchModel();
    this.searchModel.cleansingStreetStatusId = CleansingFirstNamseStatus.NonProcessed;
    this.searchModel.cleansingFirstNameRowFilter = CleansingFirstNameRowFilterEnum.Cleansable;
    this.searchModel.similarityTypeId = 0;
    this.searchModel.sortColumn = 'FirstName';
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      municipalityName: [],
      settlementName: [],
      streetName: [],
      similarityTypeId: [0],
      permutationTypeId: [0],
      cleansingStreetStatusId: [CleansingFirstNamseStatus.NonProcessed],
      cleansingStreetRowFilter: [CleansingFirstNameRowFilterEnum.Cleansable]
    });

    this.rows = [];
    this.columns = [
      {
        prop: 'firstName',
        name: 'ИМЕ'
      },
      {
        cellTemplate: this.similarityTypeName,
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
    // const dialogRef1 = this.dialog.open(StreetCleansingDialogComponent, {
    //   width: '80%',
    //   disableClose: true,
    //   data: {
    //     cleansingStreetId: id,
    //   },
    //   autoFocus: false
    // });

    // dialogRef1.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.snackBarService.openSuccess('Улицата е успешно прочистена.');
    //   }

    //   this.filter();
    //   this.cleansingStreetReport();
    // });
  }

  undoMergeFirstName(id: number) {
    // this.dialogService.confirm('',
    //   'Дали се сигурни дека сакате да го поништите прочистувањето на улицата?',
    //   'Да',
    //   'Откажи').subscribe(answer => {
    //     if (answer) {
    //       this.cleansingStreetService.undoMergeStreet(id)
    //         .subscribe(() => {
    //           this.filter();
    //           this.snackBarService.openSuccess('Прочистувањето на улицата е поништено.');
    //         });
    //     }
    //   });
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

