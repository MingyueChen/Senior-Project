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
  constructor(public homeService: HomeService, private authService: AuthService) { }

  ngOnInit() {

    $('#slide-img-container').sliderPro({
      width: 960,
      height: 500,
      arrows: true,
      buttons: false,
      waitForLayers: true,
      thumbnailWidth: 200,
      thumbnailHeight: 100,
      thumbnailPointer: true,
      autoplay: false,
      autoScaleLayers: false,
      breakpoints: {
        500: {
          thumbnailWidth: 120,
          thumbnailHeight: 50
        }
      }
    });

    this.homeService.getInfo();
    // 1st argument in subscribe: a function which is called whenever a new value was received
    this.homeSub = this.homeService.getInfoUpdateListener()
      .subscribe((employeeInfo: EmployeeInfo[]) => {
       this.employeeInfo = employeeInfo;
      });
      this.adminIsAuthenticated = this.authService.getIsAuth();
      this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.adminIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(employeeID: string) {
    this.homeService.deleteEmployeeInfo(employeeID);
  }
  // when this component is not part of DOM, the subcscriptions which we set up are not living anymore. Otherwise, we will get memory leak.
  ngOnDestroy() {
    this.homeSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

}
