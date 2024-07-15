import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Router } from '@angular/router';

import { RolesService } from '@services/roles.service';
import { Role } from '@interfaces/Role';
import { HelpersService } from '@services/helpers.service';

@Component({
  selector: 'app-form-roles',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-roles.component.html',
})
export class FormRolesComponent implements OnInit {
  public rolService = inject(RolesService);
  public dialogRef = inject(DialogRef<Role>);
  public formBuilder = inject(FormBuilder);
  public router = inject(Router);
  public helpers = inject(HelpersService);

  formRol: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(1),
  });
  id?: string;
  constructor(@Inject(DIALOG_DATA) public rol: Role) {}
  ngOnInit(): void {
    this.formRol = this.formBuilder.group({
      id: null,
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      status: 1,
    });
    if (this.rol) {
      this.id = this.rol.rol_code;
      this.formRol.setValue({
        id: this.rol.rol_code,
        name: this.rol.rol_name,
        description: this.rol.rol_description,
        status: this.rol.rol_status,
      });
    }
  }

  saveRol() {
    if (this.formRol.invalid) {
      return;
    }
    const { name, description, status } = this.formRol.getRawValue();
    const roleObject: Role = {
      rol_name: name,
      rol_description: description,
      rol_status: status,
    };
    if (!this.id) {
      this.rolService.InsertRole(roleObject).subscribe({
        next: (res) => {
          if (res.success) {
            this.helpers.alertMixi('Rol insertado correctamente.');
            this.rolService.GetRoles();
            this.close();
          } else {
            this.helpers.alertMixi(res.error, 'error');
          }
        },
        error: (err) => {
          this.helpers.alertMixi(err, 'error');
        },
      });
    } else {
      roleObject.rol_code = this.id;
      this.rolService.EditRole(roleObject).subscribe({
        next: (res) => {
          if (res.success) {
            this.helpers.alertMixi('Rol modificado correctamente.');
            this.rolService.GetRoles();
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
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
}
