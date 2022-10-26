import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleansingFirstNameGridModel } from '../models/cleansing-first-name-grid-model';
import { CleansingFirstNameReportModel } from '../models/cleansing-first-name-report-model';
import { KeyValue } from '../models/key-value';
import { MergeFirstNameViewModel } from '../models/merge-first-name-view-model';
import { SearchResult } from '../models/search-result';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class CleansingService {

  constructor(private dataService: DataService) { }

  getDocumentColumnStatistic(fileName: string): Observable<any> {
    return this.dataService.ajaxPost('Cleansing/GetDocumentColumnStatistic', { fileName });
  }

  getCleansingMethods(): Observable<any> {
    return this.dataService.ajaxPost('Cleansing/GetCleansingMethods', null);
  }

  cleanFile(operationTypes: any, fileName: string): Observable<any> {
    return this.dataService.ajaxPost('Cleansing/CleanFile', { operationTypes, fileName });
  }

  filterCleansingFirstNamesInGrid(data: any): Observable<SearchResult<CleansingFirstNameGridModel>> {
    return this.dataService.ajaxPost('Cleansing/FilterCleansingFirstNamesInGrid', data);
  }

  getCleansingFirstNameReport(): Observable<CleansingFirstNameReportModel> {
    return this.dataService.ajaxPost('Cleansing/GetCleansingFirstNameReport', null);
  }

  getFirstNameForCleansingById(id: number) {
    debugger;
    return this.dataService.ajaxPost('Cleansing/GetFirstNameForCleansingById', { id });
  }

  getAllFirstNames(): Observable<Array<KeyValue<number, string>>> {
    return this.dataService.ajaxPost('Cleansing/GetAllFirstNames', null);
  }

  mergeFirstName(model: MergeFirstNameViewModel): Observable<boolean> {
    return this.dataService.ajaxPost('Cleansing/MergeFirstName', model);
  }

  rejectMergeFirstName(id: number): Observable<boolean> {
    return this.dataService.ajaxPost('Cleansing/RejectMergeFirstName', {id});
  }
}
