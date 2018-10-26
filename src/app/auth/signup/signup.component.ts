import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  public authStatus;
  public isKaEmail = false;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {

    });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (! (form.value.email.includes('@kattell.com'))) {
      this.isKaEmail = false;
      console.log(form.value.email);
      return;
    }
    this.isKaEmail = true;
    this.authService.createAdmin(form.value.email, form.value.password);
  }

    ngOnDestroy() {
      this.authStatusSub.unsubscribe();
    }

}
