import { CommonModule } from '@angular/common';
import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {
  IconCaretsDownComponent,
  IconMenuDashboardComponent,
  IconCaretDownComponent,
  IconMinusComponent,
  IconMenuChatComponent,
  IconMenuMailboxComponent,
  IconMenuTodoComponent,
  IconMenuNotesComponent,
  IconMenuScrumboardComponent,
  IconMenuContactsComponent,
  IconMenuInvoiceComponent,
  IconMenuCalendarComponent,
  IconMenuElementsComponent,
  IconMenuTablesComponent,
  IconMenuDatatablesComponent,
  IconMenuFormsComponent,
  IconMenuUsersComponent,
  IconMenuPagesComponent,
  IconMenuAuthenticationComponent,
  IconMenuComponentsComponent,
  IconMenuChartsComponent,
  IconMenuWidgetsComponent,
  IconMenuFontIconsComponent,
  IconMenuDragAndDropComponent,
  IconCardComponent
} from '../icon';
import { slideDownUp } from '../animations';
import { TokenService } from '@services/token.service';
import { IconMoneyComponent } from "../icon/icon-money";
import { HelpersService } from '@services/helpers.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    animations: [slideDownUp],
    imports: [
        CommonModule,
        RouterModule,
        NgScrollbarModule,
        IconCaretsDownComponent,
        IconMenuDashboardComponent,
        IconCaretDownComponent,
        IconMinusComponent,
        IconMenuChatComponent,
        IconMenuMailboxComponent,
        IconMenuTodoComponent,
        IconMenuNotesComponent,
        IconMenuScrumboardComponent,
        IconMenuContactsComponent,
        IconMenuInvoiceComponent,
        IconMenuCalendarComponent,
        IconMenuElementsComponent,
        IconMenuTablesComponent,
        IconMenuDatatablesComponent,
        IconMenuFormsComponent,
        IconMenuUsersComponent,
        IconMenuPagesComponent,
        IconMenuAuthenticationComponent,
        IconMenuComponentsComponent,
        IconMenuChartsComponent,
        IconMenuWidgetsComponent,
        IconMenuFontIconsComponent,
        IconMenuDragAndDropComponent,
        IconCardComponent,
        IconMoneyComponent,
    ]
})
export class SidebarComponent implements OnInit {
  public router = inject(Router);
  public storeData = inject(Store);
  public tokenService = inject(TokenService);
  public helpers = inject(HelpersService);

  active = false;
  store: any;
  activeDropdown: string[] = [];
  parentDropdown: string = '';
  logo: string = '';
  personalization: boolean = false;
  users: boolean = true;
  client: boolean = true;
  bets: boolean = true;
  lots: boolean = true;

  constructor() {
    this.initStore();
  }
  async initStore() {
    this.storeData
      .select((d) => d.index)
      .subscribe((d) => {
        this.store = d;
      });
    const payload = this.tokenService.getPayload();
    if (payload) {

    }
  }
  ngOnInit() {
    this.setActiveDropdown();
  }

  setActiveDropdown() {
    const selector = document.querySelector(
      '.sidebar ul a[routerLink="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any =
          ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }

  toggleMobileMenu() {
    if (window.innerWidth < 1024) {
      this.storeData.dispatch({ type: 'toggleSidebar' });
    }
  }

  toggleAccordion(name: string, parent?: string) {
    if (this.activeDropdown.includes(name)) {
      this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
    } else {
      this.activeDropdown.push(name);
    }
  }
}
