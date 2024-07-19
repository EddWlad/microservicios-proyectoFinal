import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HelpersService } from './helpers.service';
import { environment } from '../../environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { User, UserInsert, UserResponse, UsersResponse } from '@interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  private helpers = inject(HelpersService);
  private apiUrl = `${environment.API_URL}users/api/user`;
  constructor() {}

  GetUsers(): Observable<UsersResponse> {
    return this.http
      .get<UsersResponse>(
        `${this.apiUrl}`
      )
      .pipe(
        map((response:any) => response),
        catchError(this.helpers.errorHandler)
      );
  }
  GetUserId(id: string) {
    return this.http
      .get<UserResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map((resp:any) => resp),
        catchError(this.helpers.errorHandler)
      );
  }
  InsertUser(user: UserInsert) {
    return this.http
      .post<UserResponse>(`${this.apiUrl}`, user )
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(this.helpers.errorHandler)
      );
  }
  EditUser(user: User) {
    const { use_code, ...rest} = user;
    return this.http
      .put<UserResponse>(`${this.apiUrl}/${use_code}`, rest )
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(this.helpers.errorHandler)
      );
  }
  DeleteUser(id: string) {
    return this.http
      .delete<UserResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(this.helpers.errorHandler)
      );
  }
  GetUsersRoles(page: number, limit: number, search?: string) {
    return this.http
      .get<UsersResponse>(
        `${this.apiUrl}/roles?page=${page}&limit=${limit}&search=${search}`
      )
      .pipe(
        map((response: any) => response),
        catchError(this.helpers.errorHandler)
      );
  }

}
