import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { HelpersService } from './helpers.service';
import { Permit, PermitInsert, PermitResponse } from '@interfaces/Permits';

@Injectable({
  providedIn: 'root',
})
export class PermitsService {
  private http = inject(HttpClient);
  private helpers = inject(HelpersService);
  private tokenService = inject(TokenService)
  private apiUrl = `${environment.API_URL}api/permisos`;
  dataAccess = signal<PermitResponse | null>(null);
  constructor() {}
  GetPermits(id: string) {
    return this.http.get<PermitResponse>(`${this.apiUrl}/${id}`).pipe(
      map((resp) => resp),
      catchError(this.helpers.errorHandler)
    );
  }

  InsertPermit(permits: PermitInsert[]) {
    return this.http.post<PermitResponse>(`${this.apiUrl}/`, { permits }).pipe(
      map((resp) => {
        return resp;
      }),
      catchError(this.helpers.errorHandler)
    );
  }
  GetPermitsRole(name: string) {
    return this.http.get<PermitResponse>(`${this.apiUrl}/role?roleName=${name}`).pipe(
      map((resp) => resp),
      catchError(this.helpers.errorHandler)
    );
  }
  ValidateAccess(module: string, permit: string): Observable<boolean> {
    if (this.dataAccess()) {
      const moduleFound = this.dataAccess()?.data.find(
        (mod: Permit) => mod.per_module.mod_title.toLowerCase() === module.toLowerCase()
      );
      let permitSuccess = false;
  
      if (moduleFound) {
        switch (permit.toLowerCase()) {
          case 'view':
            permitSuccess = moduleFound.per_read;
            break;
          case 'update':
            permitSuccess = moduleFound.per_update;
            break;
          case 'write':
            permitSuccess = moduleFound.per_write;
            break;
          case 'delete':
            permitSuccess = moduleFound.per_delete;
            break;
          default:
            permitSuccess = false;
            break;
        }
      }
      return of(permitSuccess);
    } else {
      const payload = this.tokenService.getPayload();
      if (payload) {
        return this.GetPermitsRole(payload.role).pipe(
          map((res) => {
            if (res.success) {
              this.dataAccess.set(res);
              const moduleFound = res.data.find(
                (mod: Permit) => mod.per_module.mod_title === module
              );
              let permitSuccess = false;
  
              if (moduleFound) {
                switch (permit.toLowerCase()) {
                  case 'view':
                    permitSuccess = moduleFound.per_read;
                    break;
                  case 'update':
                    permitSuccess = moduleFound.per_update;
                    break;
                  case 'write':
                    permitSuccess = moduleFound.per_write;
                    break;
                  case 'delete':
                    permitSuccess = moduleFound.per_delete;
                    break;
                  default:
                    permitSuccess = false;
                    break;
                }
              }
              return permitSuccess;
            } else {
              return false;
            }
          }),
          catchError(() => of(false))
        );
      } else {
        return of(false);
      }
    }
  }
  
}
