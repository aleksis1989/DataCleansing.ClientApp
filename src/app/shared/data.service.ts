import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = 'http://localhost:12267/';

  constructor(private http: HttpClient) { }

  ajaxPost(url: string, dataForSend: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'FROM-ANGULAR': '1' })
    };

    return this.http
      .post(this.baseUrl + url, dataForSend, httpOptions)
      .pipe(
        tap(data => {
          return data;
        }));
  }

  ajaxPostBlob(url: string, dataForSend: any): Observable<any> {
    return this.http.post(url, dataForSend, { observe: 'response', responseType: 'blob', headers: { 'FROM-ANGULAR': '1' } })
      .pipe(
        tap(data => {
          return data;
        }));
  }

  upload(url: string, formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + url, formData).pipe(tap(data => {
      return data;
    }));
  }

  downloadFile(url: string, fileName: string) {
    this.ajaxPostBlob(this.baseUrl + url, { fileName })
      .subscribe(response => {
        this.saveFile(response.body, fileName + ".xls");
      }, (error: any) => {
      });
  }

  private saveFile(fileContent: Blob, fileName: string) {
    try {
      const url = window.URL.createObjectURL(fileContent);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      const title = 'ERROR';
      const okText = 'CLOSE';
    }
  }
}
