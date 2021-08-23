import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";

import { CoursesActions } from "./actions-types";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {

    loadCourses$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CoursesActions.loadAllCourses),
                concatMap(action => this.coursesServices.findAllCourses()),
                map(courses => CoursesActions.allCoursesLoaded({ courses }))
            )
    );

    saveCourse$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(CoursesActions.courseUpdated),
                concatMap(action => this.coursesServices.saveCourse(
                    action.update.id,
                    action.update.changes
                ))
            ), { dispatch: false }
    );

    constructor(private actions$: Actions, private coursesServices: CoursesHttpService) { }
}