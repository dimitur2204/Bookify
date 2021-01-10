import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,AfterViewInit {

  @ViewChild('emailInput') emailInput:ElementRef|null;
  hidePass = true;

  private regSub$:Subscription|null = null;

  isLoading: boolean = false;

  errorToShow: string = '';
  
  constructor(private authService:AuthService,private router:Router) {
    this.emailInput = null;
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.emailInput?.nativeElement.focus();
  }

  submitHandler(form:NgForm): void{
    this.isLoading = true;
    const userInfo = {
      ...form.value
    };

    this.regSub$ = this.authService.login(userInfo).subscribe(
      res => {
        this.isLoading = false;
        this.router.navigate(["/"]);
        console.log(res);
      },
      error => {
        if (error === 'Duplicate field value entered') {
          this.errorToShow = 'This email already exists';
        }else{
          this.errorToShow = error;
        }
        this.isLoading = false;
        form.reset();
      }
    )
  }

  ngOnDestroy(): void {
    this.regSub$?.unsubscribe();
  }

}
