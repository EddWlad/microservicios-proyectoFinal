import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Courses } from '@interfaces/Courses';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoursesService } from '@services/courses.service';
import { HelpersService } from '@services/helpers.service';
import { UsersService } from '@services/users.service';

interface Select {
  id: string,
  name: string
}
@Component({
  selector: 'app-form-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './form-courses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCoursesComponent {
  public coursesService = inject(CoursesService);
  public usersService = inject(UsersService);
  public dialogRef = inject(DialogRef);
  public formBuilder = inject(FormBuilder);
  public helpers = inject(HelpersService);

  formCourse: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(''),
    description: new FormControl(''),
    id_usuario: new FormControl(''),
    durationTime: new FormControl(''),
    status: new FormControl(1),
  });
  users = signal<Select[]>([]);
  id?: string;
  constructor(@Inject(DIALOG_DATA) public course: Courses) {}
  ngOnInit(): void {
    this.GetUsers();
    this.formCourse = this.formBuilder.group({
      id: null,
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
      durationTime: ['', [Validators.required, Validators.minLength(1)]],
      id_usuario: ['', [Validators.required, Validators.minLength(1)]],
      status: 1,
    });
    if (this.course) {
      this.id = this.course.id;
      this.formCourse.setValue({
        id: this.course.id,
        id_usuario: this.course.id_usuario,
        name: this.course.name,
        description: this.course.description,
        durationTime: this.course.durationTime,
        status: this.course.state,
      });
    }
  }
  GetUsers() {
    return this.usersService
      .GetUsers()
      .subscribe((users) => {
        const userArray = users.data.users.map((x) => {
          return {
            id: x.use_code,
            name: x.use_name + ' ' + x.use_lastname
          };
        });
        this.users.set(userArray);
      });
  }
  saveRol() {
    if (this.formCourse.invalid) {
      return;
    }
    const { name, description, status, durationTime, id_usuario } = this.formCourse.getRawValue();
    const roleObject: Courses = {
        name,
        description,
        durationTime,
        state: status,
        id_usuario
    };
    console.log(roleObject)
    if (!this.id) {
      this.coursesService.InsertCourse(roleObject).subscribe({
        next: (res) => {
          if (res) {
            this.helpers.alertMixi('Rol insertado correctamente.');
            this.close(true);
          } else {
            this.helpers.alertMixi("Error al ingresar el curso", 'error');
          }
        },
        error: (err) => {
          this.helpers.alertMixi(err, 'error');
        },
      });
    } else {
      roleObject.id = this.id;
      this.coursesService.EditCourse(roleObject).subscribe({
        next: (res) => {
          if (res) {
            this.helpers.alertMixi('Rol modificado correctamente.');
            this.close(true);
          } else {
            this.helpers.alertMixi("Error al editar el curso", 'error');
          }
        },
        error: (err) => {
          this.helpers.alertMixi(err, 'error');
        },
      });
    }
  }
  close(result: boolean = false) {
    this.dialogRef.close(result);
  }
}
