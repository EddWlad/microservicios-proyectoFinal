import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  IconAirplayComponent,
  IconCalendarComponent,
  IconChatNotificationComponent,
  IconEditComponent,
  IconMenuComponent,
  IconSearchComponent,
  IconXCircleComponent,
  IconMoonComponent,
  IconSunComponent,
  IconLaptopComponent,
  IconMailDotComponent,
  IconMenuDashboardComponent,
  IconBellBingComponent,
  IconUserComponent,
  IconMailComponent,
  IconLockDotsComponent,
  IconLogoutComponent,
  IconCaretDownComponent,
  IconMenuAppsComponent,
  IconMenuComponentsComponent,
  IconMenuElementsComponent,
  IconMenuDatatablesComponent,
  IconMenuFormsComponent,
  IconMenuPagesComponent,
  IconMenuMoreComponent,
} from '../icon';
import { MenuModule } from 'headlessui-angular';

import { AppService } from '@services/app.service';
import { AuthService } from '@services/auth.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    IconAirplayComponent,
    IconMenuComponent,
    IconCalendarComponent,
    IconEditComponent,
    IconChatNotificationComponent,
    IconSearchComponent,
    IconXCircleComponent,
    IconMoonComponent,
    IconSunComponent,
    IconLaptopComponent,
    IconMailDotComponent,
    IconMenuDashboardComponent,
    IconBellBingComponent,
    IconUserComponent,
    IconMailComponent,
    IconLockDotsComponent,
    IconLogoutComponent,
    IconCaretDownComponent,
    IconMenuAppsComponent,
    IconMenuComponentsComponent,
    IconMenuElementsComponent,
    IconMenuDatatablesComponent,
    IconMenuFormsComponent,
    IconMenuPagesComponent,
    IconMenuMoreComponent,
    MenuModule
  ],
  templateUrl: './header.component.html',
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
})
export class HeaderComponent implements OnInit,DoCheck{
  public router = inject(Router);
  public storeData = inject(Store);
  public appSetting = inject(AppService);
  public authService = inject(AuthService);
  public tokenService = inject(TokenService);
  store: any;
  search = false;
  rol:string="";
  username:string="";
  logo: string="";

  constructor() {
    this.initStore();
  }
  async initStore() {
    this.storeData
      .select((d) => d.index)
      .subscribe((d) => {
        this.store = d;
      });
    const payload =this.tokenService.getPayload();
    if(payload){
      this.username =payload.name;
      this.rol = payload.role;
    }    
  }
  ngDoCheck() {
    this.store.isDarkMode
      ? (this.logo = '/assets/images/LogoCXVideo2.png')
      : (this.logo = '/assets/images/LogoCXVideo3.png');
  }
  ngOnInit() {
    this.setActiveDropdown();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveDropdown();
      }
    });
  }

  setActiveDropdown() {
    const selector = document.querySelector(
      'ul.horizontal-menu a[routerLink="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add('active');
      const all: any = document.querySelectorAll(
        'ul.horizontal-menu .nav-link.active'
      );
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }
  logout() {
    this.authService.logout();
  }
  
}
