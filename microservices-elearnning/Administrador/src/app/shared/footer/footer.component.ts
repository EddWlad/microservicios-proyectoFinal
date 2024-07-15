import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  currYear: number = new Date().getFullYear();
}
