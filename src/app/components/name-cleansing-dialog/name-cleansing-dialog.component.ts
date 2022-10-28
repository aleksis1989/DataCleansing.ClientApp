import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { CleansingFirstNameViewModel } from 'src/app/models/cleansing-first-name-view-model';
import { CleansingFirstNamseStatus } from 'src/app/models/cleansing-first-namse-status';
import { KeyValue } from 'src/app/models/key-value';
import { MergeFirstNameViewModel } from 'src/app/models/merge-first-name-view-model';
import { CleansingService } from 'src/app/services/cleansing.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-name-cleansing-dialog',
  templateUrl: './name-cleansing-dialog.component.html',
  styleUrls: ['./name-cleansing-dialog.component.css']
})
export class NameCleansingDialogComponent implements OnInit {
  dialogTitle: string | undefined;
  myForm: FormGroup;

  cleansingFirstNameStatus = CleansingFirstNamseStatus;
  cleansingFirstNameViewModel: CleansingFirstNameViewModel = new CleansingFirstNameViewModel();
  cleansingFirstNameTotalPersons: number = 0;

  similaritySelected = false;
  suggestedFirstNameSelected = false;
  manualInput = false;
  enableManualInputBtn = false;

  firstNames: Array<KeyValue<number, string>> = [];
  filteredFirstNames!: Observable<Array<KeyValue<number, string>>>;

  firstNameSubscription: Subscription | undefined;

  constructor(
    private dialogService: DialogsService,
    private snackBarService: SnackBarService,
    private cleansingService: CleansingService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NameCleansingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      cleansingFirstNameId: number,
    }) {
    this.myForm = this.fb.group({
      cleansingFirstNameId: [this.data.cleansingFirstNameId],
      cleansingFirstName: ['', Validators.required],
      cleansingFirstNameStatusId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.dialogTitle = 'Прочистување на имиња';

    if (!this.data.cleansingFirstNameId) {
      alert('Невалиден идентификатор!');
      return;
    }

    this.cleansingService.getFirstNameForCleansingById(this.data.cleansingFirstNameId)
      .subscribe((response: CleansingFirstNameViewModel) => {

        if (response) {
          this.cleansingFirstNameViewModel = response;

          if (!response.similarityFirstNameCleansingResult) {
            this.manualInput = true;
            this.cleansingFirstNameStatusId?.setValue(CleansingFirstNamseStatus.ManualCorrection);

          } else {
            const firstNameDestinationTemp = new KeyValue<number, string>();
            firstNameDestinationTemp.key = this.cleansingFirstNameViewModel.similarityFirstNameId;
            firstNameDestinationTemp.value = this.cleansingFirstNameViewModel.similarityFirstNameCleansingResult;
            this.cleansingFirstName?.setValue(firstNameDestinationTemp);
          }

          this.cleansingService.getAllFirstNames()
            .subscribe(firstNames => {
              this.firstNames = firstNames;

              if (this.cleansingFirstName) {
                this.filteredFirstNames = this.cleansingFirstName
                  .valueChanges
                  .pipe(
                    startWith(''),
                    map(value => this._filterFirstNames({ value }))
                  );
              }
            });
        }
      });
  }

  get cleansingFirstName() {
    if (this.myForm) {
      return this.myForm?.controls['cleansingFirstName'];
    }

    return null;
  }

  get cleansingFirstNameStatusId() {
    if (this.myForm) {
      return this.myForm?.controls['cleansingFirstNameStatusId'];
    }

    return null;
  }

  submit() {
    console.log(this.myForm?.getRawValue());

    if (this.myForm?.valid) {
      const model = this.myForm?.getRawValue() as MergeFirstNameViewModel;
      this.cleansingService.mergeFirstName(model)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }

  rejectFirstNameCleansing() {
    this.dialogService.confirm('',
      'Дали се сигурни дека сакате да го одбиете прочистувањето на името?',
      'Да',
      'Откажи').subscribe(answer => {
        if (answer) {
          this.cleansingService.rejectMergeFirstName(this.data.cleansingFirstNameId).subscribe(() => {
            this.snackBarService.openSuccess('Записот е успешно одбиен.');
            this.dialogRef.close(null);
          });
        }
      });
  }

  onCardClick(value: any) {
    if (value === this.cleansingFirstNameStatus.AcceptSimilarity) {
      this.similaritySelected = true;
      this.suggestedFirstNameSelected = true;
      this.manualInput = false;

      const firstNameTemp = new KeyValue<number, string>();
      firstNameTemp.key = this.cleansingFirstNameViewModel.similarityFirstNameId;
      firstNameTemp.value = this.cleansingFirstNameViewModel.similarityFirstName;
      this.cleansingFirstName?.setValue(firstNameTemp);
      this.cleansingFirstNameStatusId?.setValue(this.cleansingFirstNameStatus.AcceptSimilarity);
      return;

    } else if (value === this.cleansingFirstNameStatus.ManualCorrection) {
      this.similaritySelected = false;
      this.suggestedFirstNameSelected = false;
      this.manualInput = true;
      this.cleansingFirstNameStatusId?.setValue(CleansingFirstNamseStatus.ManualCorrection);
      return;
    }

    this.similaritySelected = false;
    this.suggestedFirstNameSelected = false;
  }


  private _filterFirstNames({ value }: { value: string; }): KeyValue<number, string>[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.firstNames.filter(option => option && this.firstNames && option.value && option.value.toLowerCase().includes(filterValue));
    }

    return [];
  }

  showManualInputBtn() {
    if (this.similaritySelected) {
      return true;
    }

    return false;
  }

  onManualBtnClick() {
    this.similaritySelected = false;
    this.manualInput = true;
    this.cleansingFirstNameStatusId?.setValue(CleansingFirstNamseStatus.ManualCorrection);
  }

  onFirstNameFocus() {
    if (this.firstNameSubscription) {
      if (this.firstNameSubscription.closed) {
        this.firstNameSubscription = this.cleansingFirstName?.valueChanges.subscribe(value => {
          if (value) {
            if (this.cleansingFirstName?.dirty && typeof value !== 'object' && (value as string).length > 0) {
              this.cleansingFirstName?.setErrors({ invalid_selection: true });
            } else if (value && value.key) {
              this.firstNameSubscription?.unsubscribe();
            }
          }
        });
      }
    } else {
      this.firstNameSubscription = this.cleansingFirstName?.valueChanges.subscribe(value => {
        if (value) {
          if (this.cleansingFirstName?.dirty && typeof value !== 'object' && (value as string).length > 0) {
            this.cleansingFirstName?.setErrors({ invalid_selection: true });
          } else if (value && value.key) {
            this.firstNameSubscription?.unsubscribe();
          }
        }
      });
    }
  }

  displayFnFirstName(firstName: any): string {
    return firstName && firstName.value ? firstName.value : '';
  }
}

