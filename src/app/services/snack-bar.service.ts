import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/common/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private configSucces: MatSnackBarConfig = {
    panelClass: ['snack-bar-succes'],
    duration: 2000,
  };

  private configError: MatSnackBarConfig = {
    panelClass: ['snack-bar-error'],
    duration: 2000
  };

  constructor(public snackBar: MatSnackBar) { }

  openSuccess(message: string) {
    const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, this.configSucces);
    snackBarRef.instance.message = message;
    snackBarRef.instance.type = 'success';

  }

  openError(message: string) {
    const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, this.configError);
    snackBarRef.instance.message = message;
    snackBarRef.instance.type = 'error';
  }
}
