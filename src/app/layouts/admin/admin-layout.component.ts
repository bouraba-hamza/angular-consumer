import {Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit,HostListener} from '@angular/core';
import 'rxjs/add/operator/filter';
import {state, style, transition, animate, trigger, AUTO_STYLE} from '@angular/animations';

import { MenuItems } from '../../shared/menu-items/menu-items';
import { Subscription, Observable } from 'rxjs';

import { CheckConnectivityComponent } from '../../check-connectivity/check-connectivity.component';


import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Headers} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";


export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('mobileMenuTop', [
        state('no-block, void',
            style({
                overflow: 'hidden',
                height: '0px',
            })
        ),
        state('yes-block',
            style({
                height: AUTO_STYLE,
            })
        ),
        transition('no-block <=> yes-block', [
            animate('400ms ease-in-out')
        ])
    ])
  ]
})

export class AdminLayoutComponent implements OnInit {
  deviceType = 'desktop';
  verticalNavType = 'expanded';
  verticalEffect = 'shrink';
  innerHeight: string;
  isCollapsedMobile = 'no-block';
  isCollapsedSideBar = 'no-block';
  toggleOn = true;
  windowWidth: number;

  public  isOnline: boolean;
  public  showConnectionStatus: boolean;
  public showConnectionStatusSub: Subscription;
  public showConnectionStatusTimer: Observable<any>;

  public val_connection_state = 'online' ;
  public btn_save_offline ;
  public htmlButton: string;

  public array_all_userRoles;
  public count_cols_permissionsGrade; // 5 prédifinis

 public current_grade_previlege = '' ;

  constructor(public menuItems: MenuItems , private http:HttpClient,private authService:AuthService,private router:Router ) {
    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributs(this.windowWidth);

  }



  ngOnInit() {
      if( navigator.onLine){
          this.val_connection_state = 'online' ;
      }else{
          this.val_connection_state = 'offline' ;
      }

  }



    onLogout(){

        // event.preventDefault();
        this.authService.logout()
            .subscribe(
                response =>{
                    localStorage.removeItem('token');
                    console.log(response);

                } ,
                err => console.log(err),
                () => this.router.navigate(['login'])
            )
        // this.router.navigate(['costumer']);
    }

  onClickedOutside(e: Event) {
      if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
          this.toggleOn = true;
          this.verticalNavType = 'offcanvas';
      }
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }

    if (reSizeFlag) {
      this.setMenuAttributs(this.windowWidth);
    }
  }

  setMenuAttributs(windowWidth) {
      if (windowWidth >= 768 && windowWidth <= 1024) {
        this.deviceType = 'tablet';
        this.verticalNavType = 'collapsed';
        this.verticalEffect = 'push';
      } else if (windowWidth < 768) {
        this.deviceType = 'mobile';
        this.verticalNavType = 'offcanvas';
        this.verticalEffect = 'overlay';
      } else {
        this.deviceType = 'desktop';
        this.verticalNavType = 'expanded';
        this.verticalEffect = 'shrink';
      }
  }

    @HostListener('window:offline', ['$event']) onOffline() {
        this.isOnline = false;
        this.showConnectionStatus = true;
        if (this.showConnectionStatusSub) {
            this.showConnectionStatusSub.unsubscribe();
        }
        console.log('HostListener : offline');
        this.val_connection_state = 'offline' ;
        return 0 ;
    }


    @HostListener('window:online', ['$event']) onOnline() {
        this.isOnline = true;
        this.showConnectionStatus = true;
        if (this.showConnectionStatusSub) {
            this.showConnectionStatusSub.unsubscribe();
        }
        console.log('HostListener : online');
        this.val_connection_state = 'online' ;
        // return this.isOnline ;
        return 1 ;
    }

  toggleOpened() {
    if (this.windowWidth < 768) {
        this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
        this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    } else {
        this.verticalNavType = this.verticalNavType === 'expanded' ? 'collapsed' : 'expanded';
    }
  }

  toggleOpenedSidebar() {
    this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
  }

  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }
}
