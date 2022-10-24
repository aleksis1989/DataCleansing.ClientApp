import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleansingFirstNameGridModel } from '../models/cleansing-first-name-grid-model';
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
}
