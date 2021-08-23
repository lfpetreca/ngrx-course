import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from "rxjs";

import { defaultDialogConfig } from '../shared/default-dialog-config';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';
import { compareCourses, Course } from '../model/course';
import { AppState } from '../../reducers';
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from '../courses.selectors';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  advancedCourses$: Observable<Course[]>;
  beginnerCourses$: Observable<Course[]>;
  promoTotal$: Observable<number>;

  constructor(private dialog: MatDialog, private store: Store<AppState>) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerCourses$ = this.store.pipe(select(selectBeginnerCourses));
    this.advancedCourses$ = this.store.pipe(select(selectAdvancedCourses));
    this.promoTotal$ = this.store.pipe(select(selectPromoTotal));
  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: 'create'
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }

}
