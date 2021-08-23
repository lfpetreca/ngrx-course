import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CoursesActions } from "../actions-types";

import { compareCourses, Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {
    allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialCoursesState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const { selectAll } = adapter.getSelectors();

export const coursesReducer = createReducer(
    initialCoursesState,
    on(CoursesActions.allCoursesLoaded, (state, action) =>
        adapter.addAll(action.courses, { ...state, allCoursesLoaded: true })
    ),
    on(CoursesActions.courseUpdated, (state, action) =>
        adapter.updateOne(action.update, state)
    )
);
