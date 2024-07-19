import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { HelpersService } from './helpers.service';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs';
import { Role, RoleResponse, RolesResponse, RoleTable } from '@interfaces/Role';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private http = inject(HttpClient);
  private helpers = inject(HelpersService);
  private apiUrl = `${environment.API_URL}users/api/role`;

  constructor() {}
  GetRoles() {
    return this.http.get<RolesResponse>(`${this.apiUrl}`).pipe(
      map((resp) =>
        resp.data.map((x) => {
          return {
            id: x.rol_code || '',
            name: x.rol_name,
            description: x.rol_description,
            create_at: this.helpers.convertDate(x.rol_create_at || ''),
            status: x.rol_status? 'Activo' : 'Inactivo',
          };
        })
      ),
      catchError(this.helpers.errorHandler)
    );
  }
  GetRoleId(id: string) {
    return this.http.get<RoleResponse>(`${this.apiUrl}/${id}`).pipe(
      map((resp) => resp),
      catchError(this.helpers.errorHandler)
    );
  }
  InsertRole(role: Role) {
    const { rol_code, rol_create_at, ...rest } = role;
    return this.http.post<RoleResponse>(`${this.apiUrl}/`, rest).pipe(
      map((resp) => {
        return resp;
      }),
      catchError(this.helpers.errorHandler)
    );
  }
  EditRole(role: Role) {
    const { rol_code, rol_create_at, ...rest } = role;
    return this.http.put<RoleResponse>(`${this.apiUrl}/${rol_code}`, rest).pipe(
      map((resp) => {
        return resp;
      }),
      catchError(this.helpers.errorHandler)
    );
  }
  DeleteRole(rol_code: string) {
    return this.http.delete<RoleResponse>(`${this.apiUrl}/${rol_code}`).pipe(
      map((resp) => {
        return resp;
      }),
      catchError(this.helpers.errorHandler)
    );
  }
}
