import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuModule } from 'headlessui-angular';

import { IconCaretDownComponent, IconCompanyComponent, IconLockDotsComponent, IconMailComponent } from '@shared/icon';
import { AuthService } from '@services/auth.service';
import { AppService } from '@services/app.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HelpersService } from '@services/helpers.service';
import { IconUserComponent } from "../../../../shared/icon/icon-user";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.95)' }),
                animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
            ]),
            transition(':leave', [
                animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' })),
            ]),
        ]),
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IconCaretDownComponent,
        IconMailComponent,
        IconLockDotsComponent,
        IconCompanyComponent,
        MenuModule,
        IconUserComponent
    ]
})
export default class LoginComponent {
    public router = inject(Router);
    public storeData = inject(Store);
    public formBuilder = inject(FormBuilder);
    public appSetting = inject(AppService);
    public authService = inject(AuthService);
    public helperService = inject(HelpersService);
    store: any;
    logo: string = '';

    formLogin: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });
    constructor() {
        this.initStore();
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }
    ngOnInit(): void {
        this.formLogin = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(40),
                ],
            ],
        });
    }
    login() {
        if (this.formLogin.invalid) {
            return;
        }
        const { password, username } = this.formLogin.getRawValue();
        this.authService.login(username, password).subscribe({
            next: (res) => {
                if (res.success) {
                    this.router.navigateByUrl('/administrador');
                } else {
                    this.helperService.alertMixi(res.error, 'error');
                }
            },
            error: (err) => {
                this.helperService.alertMixi(err, 'error');
            },
        });
    }
}
