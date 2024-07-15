import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { DataTableModule } from '@bhplugin/ng-datatable';

import { HelpersService } from '@services/helpers.service';
import { Permit, PermitInsert } from '@interfaces/Permits';
import { PermitsService } from '@services/permits.service';

@Component({
  selector: 'app-form-access',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTableModule,
  ],
  templateUrl: './form-permits.component.html',
})
export class FormPermitsComponent implements OnInit {
  public dialogRef = inject(DialogRef);
  public formBuilder = inject(FormBuilder);
  public permitsService = inject(PermitsService);
  public helpers = inject(HelpersService);

  cols: any[] = [];
  idRol: number = 0;

  formAccess: FormGroup = new FormGroup({
    rows: this.formBuilder.array([]),
  });

  constructor(@Inject(DIALOG_DATA) public permits: Permit[]) {}
  get dataRows() {
    return this.formAccess.controls['rows'] as FormArray;
  }
  ngOnInit(): void {

        this.cols = [
          { field: 'modulo', title: 'Modulo' },
          {
            field: 'per_read',
            title: 'Ver',
          },
          {
            field: 'per_write',
            title: 'Crear',
          },
          {
            field: 'per_update',
            title: 'Editar',
          },
          {
            field: 'per_delete',
            title: 'Eliminar',
          },

        ];
      
      if (this.permits) {
        this.permits.map((x) => {
          this.addRow(x);
        });
      }
  }
  addRow(permit: Permit) {
    const newRow = new FormGroup({
      per_role: new FormControl(permit.per_role.rol_code),
      per_module: new FormControl(permit.per_module.mod_code),
      per_read: new FormControl(permit.per_read),
      per_update: new FormControl(permit.per_update),
      per_write: new FormControl(permit.per_write),
      per_delete: new FormControl(permit.per_delete),
    });
    this.dataRows.push(newRow);
  }
  savePermit() {
    const permits: PermitInsert[] = this.formAccess.getRawValue().rows;
    this.permitsService.InsertPermit(permits).subscribe({
      next: (res) => {
        if (res.success) {
          this.helpers.alertMixi('Permisos insertado correctamente.');
          this.close();
        } else {
          this.helpers.alertMixi(res.error, 'error');
        }
      },
      error: (err) => {
        this.helpers.alertMixi(err, 'error');
      },
    });
  
  }
  close() {
    this.dialogRef.close();
  }
}
