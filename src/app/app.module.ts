import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NamesForCleansingListComponent } from './components/names-for-cleansing-list/names-for-cleansing-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ExcelDataCleansingComponent } from './components/excel-data-cleansing/excel-data-cleansing.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const appRoutes: Routes = [

  { path: 'home', component: ExcelDataCleansingComponent, pathMatch: 'full' },
  {
    path: 'first-names-cleansing',
    component: NamesForCleansingListComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    NamesForCleansingListComponent,
    ExcelDataCleansingComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BlockUIModule.forRoot({
      delayStart: 300,
      delayStop: 0
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule,
    MatListModule,
    MatToolbarModule,
    MatDialogModule,
    HttpClientModule,
    NgxDatatableModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
