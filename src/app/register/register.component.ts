import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/services/auth.service';
import { SignUpInfo } from '../auth/models/signup-info';
import { RegionService } from '../services/region.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  regions = [];
  passType = 'password';

  constructor(
    private authService: AuthService,
    private regionService: RegionService
    ) { }

  ngOnInit() {
    this.regionService.getRegions().subscribe(
      regions => this.regions = regions
    );
  }

  onSubmit() {
    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.login,
      this.form.email,
      this.form.password,
      this.form.regionID
    );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  visiblePass(): void {
    if (this.passType === 'password') {
      this.passType = 'text';
    } else {
      this.passType = 'password';
    }
  }
}
