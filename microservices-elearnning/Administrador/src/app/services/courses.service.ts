import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HelpersService } from './helpers.service';
import { environment } from '../../environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { Courses, Root } from '@interfaces/Courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private http = inject(HttpClient);
  private helpers = inject(HelpersService);
  private apiUrl = `${environment.API_URL}courses`;
  constructor() { }
  GetCourses(): Observable<Root> {
    return this.http
      .get<Root>(
        `${this.apiUrl}`
      )
      .pipe(
        map((response:any) => response),
        catchError(this.helpers.errorHandler)
      );
  }
  GetCourseId(id: string) {
    return this.http.get<Courses>(`${this.apiUrl}/${id}`).pipe(
      map((resp) => resp),
      catchError(this.helpers.errorHandler)
    );
  }
  InsertCourse(role: Courses) {
    return this.http.post<Courses>(`${this.apiUrl}`, role).pipe(
      map((resp) => {
        return resp;
      }),
      catchError(this.helpers.errorHandler)
    );
  }
  EditCourse(course: Courses) {
    return this.http.put<Courses>(`${this.apiUrl}/${course.id}`, course).pipe(
      map((resp) => {
        return resp;
      }),
      catchError(this.helpers.errorHandler)
    );
  }
  DeleteCourse(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`).pipe(
      map((resp) => {
        return resp;
      }),
      catchError(this.helpers.errorHandler)
    );
  }
}
