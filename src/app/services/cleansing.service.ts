import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class CleansingService {

  constructor(private dataService: DataService) { }

  getDocumentColumnStatistic(fileName: string): Observable<any> {
    debugger;
    return this.dataService.ajaxPost('Cleansing/GetDocumentColumnStatistic', { fileName });
  }
}
