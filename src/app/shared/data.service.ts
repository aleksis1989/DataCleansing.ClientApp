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
    return this.http.post(url,
      {}, { observe: 'response', responseType: 'blob', headers: { 'FROM-ANGULAR': '1' } })
      .pipe(
        tap(data => {
          return data;
        }));
  }

  upload(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + 'Upload', formData).pipe(tap(data => {
      return data;
    }));
  }

  downloadFile() {
    this.ajaxPostBlob(this.baseUrl + 'download', {})
      .subscribe(response => {
        this.saveFile(response.body, "fileName.xlsx");
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
