import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../home.service';
import { EmployeeInfo } from '../home.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit, OnDestroy {

  adminIsAuthenticated = false;
  private authListenerSubs: Subscription;
  employeeInfo = [
    // { employeeName: 'Tony', email: 'tony@gmail.com'},
    // { employeeName: 'Stephen H. Kattell', email: 'skattell@kattell.com' }
  ];

  private homeSub: Subscription;
  constructor(public homeService: HomeService, private authService: AuthService) {
    window.addEventListener('resize', this.computedHeight);
    console.log('constructor');
  }

  ngDoCheck () {
    let that = this;
    window.setTimeout(function () {
      that.computedHeight();
      $('.bx-controls.bx-has-pager').css({
        'position': 'fixed',
        'bottom': '45px',
        'width': '100%',
        'display': 'block',
        'margin': '0 auto'
      });
    },500);
  }

  ngOnInit() {
    console.log('ngOnInit');
    // let slideWidth = document.documentElement.clientWidth || document.body.clientWidth;
    this.slideInit();

    // this.homeService.getInfo();
    // // 1st argument in subscribe: a function which is called whenever a new value was received
    // this.homeSub = this.homeService.getInfoUpdateListener()
    //   .subscribe((employeeInfo: EmployeeInfo[]) => {
    //    this.employeeInfo = employeeInfo;
    //   });
    //   this.adminIsAuthenticated = this.authService.getIsAuth();
    //   this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
    //     this.adminIsAuthenticated = isAuthenticated;
    //   });
  }

  slideInit () {
    let that = this;
    $('.bxslider').bxSlider({
      // slideWidth: slideWidth,
      auto: true,
      pause: 6000,
      adaptiveHeight: true,
      startSlides: 0,
      slideMargin: 10,
      controls: false,
      onSlideAfter: function ($slideElement, oldIndex, newIndex) {
        if (newIndex === 2) {
          $('.intro-third-left.animated').removeClass('slideOutLeft').addClass('slideInLeft');
          $('.intro-third-right.animated').removeClass('slideOutRight').addClass('slideInRight');
          // $('.intro-third-right.animated').removeClass('slideInRight').addClass('slideInRight');
        }
      }
    });
    window.setTimeout(function () {
      that.computedHeight();
      $('.bx-controls.bx-has-pager').css({
        'position': 'fixed',
        'bottom': '45px',
        'width': '100%',
        'display': 'block',
        'margin': '0 auto'
      });
    },500);
  }

  computedHeight () {
    let windowHeight = window.innerHeight;
    var sliderObj = $(".slider-container");
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)) {
      sliderObj.css({
        'height': windowHeight,
        'overflow': 'hidden'
      });
    } else {
      $('.bx-viewport').css({
        overflow: 'inherit'
      });
      sliderObj.css({
        'height': windowHeight,
      });
    }
  }

  onDelete(employeeID: string) {
    this.homeService.deleteEmployeeInfo(employeeID);
  }
  // when this component is not part of DOM, the subcscriptions which we set up are not living anymore. Otherwise, we will get memory leak.
  ngOnDestroy() {
    // this.homeSub.unsubscribe();
    // this.authListenerSubs.unsubscribe();
    window.removeEventListener('resize', this.computedHeight);
  }

}
