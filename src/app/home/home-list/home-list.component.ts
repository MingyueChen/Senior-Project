import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit, OnDestroy {

  constructor() {
    window.addEventListener('resize', this.computedHeight);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck () {
    const that = this;
    window.setTimeout(function () {
      that.computedHeight();
      $('.bx-controls.bx-has-pager').css({
        'position': 'relative',
        'bottom': '45px',
        'width': '100%',
        'display': 'block',
        'margin': '0 auto',
        'background': 'red'
      });
    }, 500);
  }

  ngOnInit() {
    // let slideWidth = document.documentElement.clientWidth || document.body.clientWidth;
    this.slideInit();

  }

  slideInit () {
    const that = this;
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
        'position': 'relative',
        'bottom': '45px',
        'width': '100%',
        'display': 'block',
        'margin': '0 auto',
        'background': 'red'
      });
    }, 500);
  }

  computedHeight () {
    const windowHeight = window.innerHeight;
    const sliderObj = $('.slider-container');
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(window.navigator.userAgent)) {
      sliderObj.css({
        'height': windowHeight - 50,
        'overflow': 'hidden'
      });
    } else {
      $('.bx-viewport').css({
        // overflow: 'inherit',
        overflow: 'hidden'
      });
      sliderObj.css({
        'height': windowHeight - 50,
      });
    }
  }


  // when this component is not part of DOM, the subcscriptions which we set up are not living anymore. Otherwise, we will get memory leak.
  ngOnDestroy() {
    // this.homeSub.unsubscribe();
    // this.authListenerSubs.unsubscribe();
    window.removeEventListener('resize', this.computedHeight);
  }

}
