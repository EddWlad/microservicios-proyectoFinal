import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { IconPlusComponent } from '../../../../shared/icon/icon-plus';
import { Dialog } from '@angular/cdk/dialog';
import { HelpersService } from '@services/helpers.service';
import { CoursesService } from '@services/courses.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Courses, CourseTable } from '@interfaces/Courses';
import { FormCoursesComponent } from '../../components/form-courses/form-courses.component';
import {
  IconEditComponent,
  IconEyeComponent,
  IconKeyComponent,
  IconTrashLinesComponent,
} from '@shared/icon';
import { DataTableModule } from '@bhplugin/ng-datatable';

@Component({
  selector: 'app-courses',
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
  templateUrl: './courses.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CoursesComponent implements OnInit {
  public coursesService = inject(CoursesService);
  public dialog = inject(Dialog);
  public helpers = inject(HelpersService);

  cols: any[] = [];
  courses = signal<CourseTable[]>([]);
  searchCtrl = new FormControl();
  constructor() {}
  ngOnInit(): void {
    this.GetCourses();
    this.cols = [
      { field: 'id', title: 'Id', hide: true },
      { field: 'name', title: 'Nombre' },
      {
        field: 'durationTime',
        title: 'Duración',
      },
      {
        field: 'state',
        title: 'Estado',
      },
      {
        field: 'actions',
        title: 'Acciones',
        sort: false,
        headerClass: 'justify-center',
      },
    ];
  }
  GetCourses() {
    this.coursesService.GetCourses().subscribe({
      next: (res) => {
        this.courses.set(
          res.map((x) => {
            return {
              id: x.id as string,
              name: x.name,
              durationTime: x.durationTime,
              state: x.state == 1 ? 'Activo' : 'Inactivo',
            };
          })
        );
      },
      error: (err) => {
        this.helpers.alertMixi(err, 'error');
      },
    });
  }
  EditCourse(id: string) {
    this.coursesService.GetCourseId(id).subscribe({
      next: (res) => {
        if (res) {
          this.openModal(res);
        } else {
          this.helpers.alertMixi("Error al eliminar", 'error');
        }
      },
      error: (err) => {
        this.helpers.alertMixi(err, 'error');
      },
    });
  }
  DeleteCourse(id: string) {
    this.helpers.showDeleteAlert().then((x) => {
      if (x) {
        this.coursesService.DeleteCourse(id).subscribe({
          next: (res) => {
            if (res) {
              this.helpers.alertMixi('El registro ha sido eliminado');
              this.GetCourses();
            } else {
              this.helpers.alertMixi('Error al eliminar', 'error');
            }
          },
          error: (err) => {
            this.helpers.alertMixi(err, 'error');
          },
        });
      }
    });
  }

  openModal(courses?: Courses) {
    const dialogRef = this.dialog.open(FormCoursesComponent, {
      autoFocus: false,
      data: courses,
    });
    dialogRef.closed.subscribe((output) => {
      if (output) this.GetCourses();
    });
  }
}
