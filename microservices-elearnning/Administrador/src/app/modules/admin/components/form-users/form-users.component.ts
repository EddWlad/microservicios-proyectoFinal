import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { NgSelectModule } from '@ng-select/ng-select';

import { UsersService } from '@services/users.service';
import { User } from '@interfaces/User';
import { RoleTable } from '@interfaces/Role';
import { HelpersService } from '@services/helpers.service';

interface UserSelect {
  id: string;
  name: string;
}
@Component({
  selector: 'app-form-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './form-users.component.html',
})
export class FormUsersComponent implements OnInit {
  public usersService = inject(UsersService);
  public dialogRef = inject(DialogRef);
  public formBuilder = inject(FormBuilder);
  public helpers = inject(HelpersService);

  users = signal<UserSelect[]>([]);
  roles = signal<RoleTable[]>([]);
  user = signal<User | null>(null);

  id?: string;
  showLiquidation = signal<boolean>(false);

  formUser: FormGroup = new FormGroup({
    use_code: new FormControl(null),
    use_email: new FormControl(null),
    use_name: new FormControl(null),
    use_lastname: new FormControl(null),
    use_phone: new FormControl(null),
    use_nui: new FormControl(null),
    use_address: new FormControl(null),
    use_password: new FormControl(null),
    use_confirm_password: new FormControl(null),
    use_role: new FormControl(null),
    use_status: new FormControl(1),
  });
  optionsStatus = [
    { name: 'Activo', result: 1 },
    { name: 'Inactivo', result: 2 },
  ];
  constructor(@Inject(DIALOG_DATA) public data: any) {
    this.roles.set(data.roles);
    this.user.set(data.user)
  }
  ngOnInit(): void {
    this.getUsers();
    this.formUser = this.formBuilder.group({
      use_code: '',
      use_email: ['', [Validators.required, Validators.email]],
      use_name: ['', [Validators.required, Validators.minLength(1)]],
      use_lastname: ['', [Validators.required, Validators.minLength(1)]],
      use_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
        ],
      ],
      use_nui: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      use_address: ['', [Validators.required, Validators.minLength(1)]],
      use_role: [null, [Validators.required, Validators.minLength(1)]],
      use_password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordValidator(),
        ],
      ],
      use_confirm_password: [
        '',
        [Validators.required, Validators.minLength(8), this.confirmPassword],
      ],
      use_status: [1, [Validators.required, Validators.max(3)]],
    });
    this.formUser.get('use_role')?.valueChanges.subscribe((value) => {
      this.showLiquidation.set(this.isVendedorRole(value));
    });
    if (this.user()) {
      this.formUser.setValue({
        use_code: this.user()?.use_code,
        use_email: this.user()?.use_email,
        use_name: this.user()?.use_name,
        use_lastname: this.user()?.use_lastname,
        use_phone: this.user()?.use_phone,
        use_nui: this.user()?.use_nui,
        use_password: '',
        use_confirm_password: '',
        use_address: this.user()?.use_address,
        use_role: this.user()?.use_role.rol_code,
        use_status: this.user()?.use_status,
      });

    }
  }
  isVendedorRole(roleId: string): boolean {
    const selectedRole = this.roles().find((role) => role.id === roleId);
    return (selectedRole && selectedRole.name === 'Vendedor') || false;
  }

  getUsers() {
    this.usersService.GetUsers().subscribe((users) => {
      this.users.set(
        users.data.users.map((x) => {
          return { id: x.use_code, name: x.use_name + ' ' + x.use_lastname };
        })
      );
    });
  }
  saveUser() {
    const { use_confirm_password, ...user } = this.formUser.getRawValue();
    if (this.formUser.invalid) {
      return;
    }
    if (!(user.use_code && user.use_code != '')) {
      this.usersService.InsertUser(user).subscribe({
        next: (res) => {
          if (res.success) {
            this.helpers.alertMixi('Usuario insertado correctamente');
            this.close(true);
          } else {
            this.helpers.alertMixi(res.error, 'error');
            this.close();
          }
        },
        error: (err) => {
          this.helpers.alertMixi(err, 'error');
          this.close();
        },
      });
    } else {
      this.usersService.EditUser(user).subscribe({
        next: (res) => {
          if (res.success) {
            this.helpers.alertMixi('Usuarios modificado correctamente');
            this.close(true);
          } else {
            this.helpers.alertMixi(res.error, 'error');
            this.close();
          }
        },
        error: (err) => {
          this.helpers.alertMixi(err, 'error');
          this.close();
        },
      });
    }
  }
  confirmPassword(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value) {
      return { use_confirm_password: true };
    }
    const contrasena = control.root.get('use_password');
    if (contrasena && contrasena.value !== control.value) {
      return { use_confirm_password: true };
    }
    return null;
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const valid =
        hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return valid
        ? null
        : {
            passwordStrength:
              'La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales',
          };
    };
  }
  close(result: boolean = false) {
    this.dialogRef.close(result);
  }
}
