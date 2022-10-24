import { Component, OnInit } from '@angular/core';
import { CleansingService } from 'src/app/services/cleansing.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-excel-data-cleansing',
  templateUrl: './excel-data-cleansing.component.html',
  styleUrls: ['./excel-data-cleansing.component.css']
})
export class ExcelDataCleansingComponent implements OnInit {

  title = 'DataCleansing';
  fileName: string = '';
  columnStatList: any = [];
  isFileUploaded: boolean | undefined;
  cleanedFileName: string = '';
  cleansingMethods: any;
  isFileProcessed: boolean | undefined;

  constructor(
    private dataService: DataService,
    private cleansingService: CleansingService) { }

  ngOnInit(): void {
    this.cleansingService.getCleansingMethods().subscribe(response => {
      this.cleansingMethods = response;
    });
  }

  printSelectedOperations() {
    console.log(this.cleansingMethods);
  }

  processFile() {
    this.cleansingService.getDocumentColumnStatistic(this.fileName)
      .subscribe(response => {
        this.columnStatList = response;
        this.isFileProcessed = true;
      });
  }

  cleanFile() {
    this.cleansingService.cleanFile(this.cleansingMethods, this.fileName)
      .subscribe(response => {
        this.cleanedFileName = response.fileName;
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      const formData = new FormData();
      formData.append("filePath", file);

      this.dataService.upload('Cleansing/Upload', formData).subscribe(() => {
        this.isFileUploaded = true;
      });
    }
  }

  downloadFile() {
    var cleanedFileName = this.cleanedFileName;
    this.dataService.downloadFile('Cleansing/download', cleanedFileName);
  }

  reloadPage() {
    location.reload();
  }

}
