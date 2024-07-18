import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '@bhplugin/ng-datatable';

import {
  IconEditComponent,
  IconEyeComponent,
  IconKeyComponent,
  IconPlusComponent,
  IconTrashLinesComponent,
} from '@shared/icon';
import { RolesService } from '@services/roles.service';
import { Role, RoleTable } from '@interfaces/Role';
import { FormRolesComponent } from '../../components/form-roles/form-roles.component';
import { PermitsService } from '@services/permits.service';
import { Permit } from '@interfaces/Permits';
import { FormPermitsComponent } from '../../components/form-permits/form-permits.component';
import { HelpersService } from '@services/helpers.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconEditComponent,
    IconTrashLinesComponent,
    IconEyeComponent,
    IconPlusComponent,
    IconKeyComponent,
    DataTableModule,
  ],
  templateUrl: './roles.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RolesComponent implements OnInit{
  public rolesService = inject(RolesService);
  public permitsService = inject(PermitsService);
  public dialog = inject(Dialog);
  public helpers = inject(HelpersService);

  cols: any[] = [];
  roles = signal<RoleTable[]>([]);
  searchCtrl = new FormControl();
  constructor() {}
  ngOnInit(): void {
    this.GetRoles();
    this.cols = [
      { field: 'id', title: 'Id', hide: true },
      { field: 'name', title: 'Nombre' },
      {
        field: 'description',
        title: 'Descripcion',
      },
      {
        field: 'status',
        title: 'Estado',
      },
      {
        field: 'create_at',
        title: 'Fecha creacion',
      },
      {
        field: 'actions',
        title: 'Acciones',
        sort: false,
        headerClass: 'justify-center',
      },
    ];
  }
  GetRoles() {
    this.rolesService.GetRoles().subscribe({
      next: (res) => {
        this.roles.set(res);
      },
      error: (err) => {
        this.helpers.alertMixi(err, 'error');
      },
    });
  }
  EditRol(id: string) {
    this.rolesService.GetRoleId(id).subscribe({
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
  DeleteRol(id: string) {
    this.helpers.showDeleteAlert().then((x) => {
      if (x) {
        this.rolesService.DeleteRole(id).subscribe({
          next: (res) => {
            if (res.success) {
              this.helpers.alertMixi('El registro ha sido eliminado');
              this.GetRoles();
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
  EditPermit(id: string) {
    this.permitsService.GetPermits(id).subscribe({
      next: (res) => {
        this.openModalPermit(res.data);
      },
      error: (err) => {
        this.helpers.alertMixi(err, 'error');
      },
    });
  }
  openModalPermit(permits: Permit[]) {
    this.dialog.open(FormPermitsComponent, {
      autoFocus: false,
      data: permits,
    });
  }
  openModal(rol?: Role) {
    const dialogRef = this.dialog.open(FormRolesComponent, {
      autoFocus: false,
      data: rol,
    });
    dialogRef.closed.subscribe((output) => {
      if (output) this.GetRoles();
    });
  }
}
