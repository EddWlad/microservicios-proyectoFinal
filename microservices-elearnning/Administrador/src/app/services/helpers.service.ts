import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {

  constructor() {}
  convertDate(dateString: string) {
    const date = new Date(dateString);

    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.error}`;
    } else if (error.error.errors && error.error.errors.length > 0) {
      errorMessage = `Error: ${error.error.errors.at(0).msg}`;
    } else if (error.error.msg) {
      errorMessage = `Error: ${error.error.msg}`;
    } else if (error.error.error) {
      errorMessage = error.error.error;
    } else {
      errorMessage = `Error code: ${error.status}, message: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
  alertMixi(err: any, type: any = 'success'): void {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
    toast.fire({
      icon: type,
      title: err,
      padding: '10px 20px',
    });
  }
  async showDeleteAlert() {
    return new Promise((resolve, reject) => {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          popup: 'sweet-alerts',
          confirmButton: 'btn btn-secondary',
          cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          title: 'Estas seguro',
          text: 'No podrás revertir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si eliminar',
          cancelButtonText: 'No cancelar',
          reverseButtons: true,
          padding: '2em',
        })
        .then((result) => {
          if (result.value) {
            resolve(true);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            resolve(false);
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'Tu registro está a salvo',
              'error'
            );
          }
        });
    });
  }
  generateFileName(type: string) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const timestamp = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}-${hours.toString().padStart(2, '0')}-${minutes
      .toString()
      .padStart(2, '0')}-${seconds.toString().padStart(2, '0')}-${milliseconds
      .toString()
      .padStart(3, '0')}`;
    const extension = type.split('/').at(1);
    const filename = `file-${timestamp}.${extension}`;

    return filename;
  }
  decodeBase64ToImage(base64String: string, fileName: string) {
    try {
      const base64 = this.getBase64(base64String);
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const mimeType = this.getMimeType(base64String);
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      return new File([blob], fileName, { type: mimeType });
    } catch (error) {
      return error;
    }
  }
  getMimeType(base64String: string) {
    const dataURIprefix = 'data:';
    if (base64String.startsWith(dataURIprefix)) {
      const mimeType = base64String.split(',')[0].split(':')[1];
      return mimeType;
    }
    return 'image/*';
  }
  getBase64(base64String: string) {
    const dataURIprefix = 'base64';
    const base = base64String.split(';')[1];
    if (base.startsWith(dataURIprefix)) {
      const base64 = base.split(',')[1];
      return base64;
    }
    return '';
  }
  imageToBase64(imageFile: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = (error) => reject(error.toString());
    });
  }
  convertTimeZone(clientDate: string) {
    const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = moment.tz(clientDate, clientTimeZone);
    const serverTimeZone = 'Etc/GMT';
    return now.tz(serverTimeZone).format('YYYY-MM-DD HH:mm:ss');
  }
  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}
