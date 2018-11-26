import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { UserInfo } from '../user.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  private mode = 'create';
  private userID: string;
  userInfo: UserInfo;
  form: FormGroup;

  constructor(public userService: UserService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
        'userName': new FormControl(null, {validators: [Validators.required]
        }),
        'userWebsite': new FormControl(null, {validators: [Validators.required]
        }),
        'userLocation': new FormControl(null, {validators: [Validators.required]
      })
    });
    // try to find out whether we have an userID or not
    // we can extract this by accessing this route,
    // so out inject activated route and we have maraMap object or property
    // paraMap is actually an observable to which we can subscribe
    // the call back function will be called whenever the parameter changes
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // we check if it has 'userID' because we name it userID in app-routing.module.ts
      if (paramMap.has('userID')) {
        this.mode = 'edit';
        this.userID = paramMap.get('userID');
        this.userService.getUserInfo(this.userID).subscribe(infoData => {
          this.userInfo = {userID: infoData._id,
            userName: infoData.userName,
            userWebsite: infoData.userWebsite,
            userLocation: infoData.userLocation
          };
          this.form.setValue({
            userName: this.userInfo.userName,
            userWebsite: this.userInfo.userWebsite,
            userLocation: this.userInfo.userLocation
          });
        });
      } else {
        this.mode = 'create';
        this.userID = null;
      }
    });
  }

  onSaveUserInfo () {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.userService.addInfo(
        this.form.value.userName,
        this.form.value.userWebsite,
        this.form.value.userLocation
      );
    } else {
      this.userService.updateUserInfo(this.userID, this.form.value.userName, this.form.value.userWebsite,
      this.form.value.userLocation
      );
    }
    this.form.reset();
  } // end of onSaveUserInfo

}
