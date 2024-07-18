import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { DataTableModule } from '@bhplugin/ng-datatable';

import {
  IconEditComponent,
  IconEyeComponent,
  IconPlusComponent,
  IconTrashLinesComponent,
} from '@shared/icon';
import { User, UserTable } from '@interfaces/User';

import { UsersService } from '@services/users.service';
import { FormUsersComponent } from '../../components/form-users/form-users.component';
import { RolesService } from '@services/roles.service';
import { RoleTable } from '@interfaces/Role';
import { HelpersService } from '@services/helpers.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconTrashLinesComponent,
    IconEyeComponent,
    IconEditComponent,
    IconPlusComponent,
    DataTableModule,
    
  ],
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersComponent implements OnInit {
  public dialog = inject(Dialog);
  public helpers = inject(HelpersService);
  public usersService = inject(UsersService);
  public rolesServices = inject(RolesService);

  public users = signal<UserTable[]>([]);
  roles = signal<RoleTable[]>([]);
  
  searchCtrl: string = '';
  cols: any[] = [];
  loading: boolean = true;
  totalRows = 0;
  messageData: string = '';
  params = {
    page: 1,
    limit: 10,
    sort_column: 'use_code',
    sort_direction: 'asc',
    column_filters: [],
    search: ''
  };
  ngOnInit(): void {
    this.getRoles();
    this.GetUsers();
    this.cols = [
      { field: 'id', title: 'id', hide: true },
      { field: 'nui', title: 'Identificación' },
      { field: 'fullname', title: 'Nombre' },
      { field: 'email', title: 'Correo' },
      { field: 'settlement', title: 'Liquidación' },
      { field: 'role', title: 'Rol' },
      { field: 'status', title: 'Estado' },
      { field: 'create_at', title: 'Fecha creación', type: 'date' },
      {
        field: 'actions',
        title: 'Acciones',
        sort: false,
        headerClass: 'justify-center',
      },
    ];
    this.messageData = 'No hay datos disponibles';
  }
  GetUsers() {
    return this.usersService
      .GetUsers(this.params.page, this.params.limit, this.params.search)
      .subscribe((users) => {
        const userArray = users.data.users.map((x) => {
          return {
            id: x.use_code,
            nui: x.use_nui,
            fullname: x.use_name + ' ' + x.use_lastname,
            email: x.use_email,
            role: x.use_role.rol_name,
            settlement: x.use_settlement,
            status: x.use_status == 1 ? 'Activo' : 'Inactivo',
            create_at: this.helpers.convertDate(x.use_create_at),
          };
        });
        this.totalRows = users.data.total;
        this.messageData = 'No hay datos disponibles';
        this.loading = false;
        this.users.set(userArray);
      });
  }
  EditUser(id: string) {
    this.usersService.GetUserId(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.openModal(res.data);
        } else {
          this.helpers.alertMixi(res.error, 'error');
        }
      },
      error: (err) => {
        this.helpers.alertMixi(err, 'error');
      },
    });
  }
  DeleteUser(id: string) {
    this.helpers.showDeleteAlert().then((x) => {
      if (x) {
        this.usersService.DeleteUser(id).subscribe({
          next: (res) => {
            if (res.success) {
              this.helpers.alertMixi('El registro ha sido eliminado');
              this.GetUsers();
            } else {
              this.helpers.alertMixi(res.error, 'error');
            }
          },
          error: (err) => {
            this.helpers.alertMixi(err, 'error');
          },
        });
      }
    });
  }
  getRoles() {
    this.rolesServices.GetRoles().subscribe({
      next: (res) => {
        this.roles.set(res);
      },
      error: (err) => {
        this.helpers.alertMixi(err, 'error');
      },
    });
  }
  openModal(user?: User) {
    const dialogRef = this.dialog.open(FormUsersComponent, {
      autoFocus: false,
      data: {
        user,
        roles: this.roles()
      },
    });
    dialogRef.closed.subscribe((output) => {
      if (output) this.GetUsers();
    });
  }
  changeServer(data: any) {
    this.params.search = data.search;
    this.params.page = data.current_page;
    this.params.limit = data.pagesize;
    this.params.sort_column = data.sort_column;
    this.params.sort_direction = data.sort_direction;
    this.params.column_filters = data.column_filters.reduce(
      (acc: any, filter: any) => {
        acc[filter.field] = filter.value;
        return acc;
      },
      {}
    );
    this.GetUsers();
  }
}
