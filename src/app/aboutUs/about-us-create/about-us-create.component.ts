import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AboutUsService } from '../aboutUs.service';
import { EmployeeInfo } from '../aboutUs.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-about-us-create',
  templateUrl: './about-us-create.component.html',
  styleUrls: ['./about-us-create.component.css']
})
export class AboutUsCreateComponent implements OnInit {

  private mode = 'create';
  private employeeID: string;
  employeeInfo: EmployeeInfo;
  form: FormGroup;
  imagePreview: string;
  constructor(public aboutUsService: AboutUsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
        'employeeEmail': new FormControl(null, {validators: [Validators.required, Validators.minLength(12)]
        }),
        'employeeName': new FormControl(null, {validators: [Validators.required]
        }),
        'employeeTitle': new FormControl(null, {validators: [Validators.required]
        }),
        'employeeBio': new FormControl(null, {validators: [Validators.required, Validators.minLength(10)],
        }),
        image: new FormControl(null, {validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    // try to find out whether we have an employeeID or not
    // we can extract this by accessing this route,
    // so out inject activated route and we have maraMap object or property
    // paraMap is actually an observable to which we can subscribe
    // the call back function will be called whenever the parameter changes
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // we check if it has 'employeeID' because we name it employeeID in app-routing.module.ts
      if (paramMap.has('employeeID')) {
        this.mode = 'edit';
        this.employeeID = paramMap.get('employeeID');
        this.aboutUsService.getEmployeeInfo(this.employeeID).subscribe(infoData => {
          this.employeeInfo = {employeeID: infoData._id,
              employeeEmail: infoData.employeeEmail,
              employeeName: infoData.employeeName,
              employeeTitle: infoData.employeeTitle,
              employeeBio: infoData.employeeBio,
              imagePath: infoData.imagePath};
          this.form.setValue({
            employeeEmail: this.employeeInfo.employeeEmail,
            employeeName: this.employeeInfo.employeeName,
            employeeTitle: this.employeeInfo.employeeTitle,
            employeeBio: infoData.employeeBio,
            image: this.employeeInfo.imagePath
          });
          this.imagePreview = this.employeeInfo.imagePath;
        });
      } else {
        this.mode = 'create';
        this.employeeID = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
      if (file) {
      this.form.patchValue({image: file});
      this.form.get('image').updateValueAndValidity();
      // convert an image to a dataURL
      const reader = new FileReader();
      // read the image file
      reader.onload = () => {
        this.imagePreview = <string>reader.result;
      };
      // load the image file after reading an image is done
      reader.readAsDataURL(file);
    }
  }

  onSaveEmployeeInfo () {
    if (this.form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.aboutUsService.addInfo(
        this.form.value.employeeName,
        this.form.value.employeeEmail,
        this.form.value.employeeTitle,
        this.form.value.employeeBio,
        this.form.value.image
      );
    } else {
      this.aboutUsService.updateEmployeeInfo(this.employeeID, this.form.value.employeeName, this.form.value.employeeEmail,
      this.form.value.employeeTitle,
      this.form.value.employeeBio,
      this.form.value.image
      );
    }
    this.form.reset();
  } // end of onSaveEmployeeInfo

}
