import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  public message: string | undefined;
  public type: string | undefined;

  constructor() { }
  
  ngOnInit(): void {
  }
}
