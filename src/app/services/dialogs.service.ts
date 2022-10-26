import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/common/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string, okText: string, cancelText: string): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialogComponent>;
    dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      { disableClose: true });
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.okText = okText;
    dialogRef.componentInstance.cancelText = cancelText;

    return dialogRef.afterClosed();
  }
}
