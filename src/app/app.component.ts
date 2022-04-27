import { Component, OnInit } from '@angular/core';
import { CleansingService } from './services/cleansing.service';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'DataCleansing';
  fileName: string = '';
  columnStatList: any = [];


  constructor(
    private dataService: DataService,
    private cleansingService: CleansingService) { }

  ngOnInit(): void {
    this.cleansingService.getDocumentColumnStatistic("DataSample.xlsx")
      .subscribe(response => {
        this.columnStatList = response;
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      const formData = new FormData();
      formData.append("filePath", file);

      this.dataService.upload(formData).subscribe(() => { });
    }
  }

  downloadFile() {
    this.dataService.downloadFile();
  }
}
