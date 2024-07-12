import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-reset',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './reset.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResetComponent { }
