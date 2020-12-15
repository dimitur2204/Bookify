import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,AfterViewInit,OnDestroy {

  @ViewChild('emailInput') emailInput:ElementRef|null;
  hidePass = true;

  private regSub$:Subscription|null = null;

  isLoading: boolean = false;

  errorToShow: string = '';

  constructor(private authService:AuthService) {
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

    this.regSub$ = this.authService.register(userInfo).subscribe(
      res => {
        this.isLoading = false;
      },
      error => {
        if (error === 'Duplicate field value entered') {
          this.errorToShow = 'This email already exists';
        }
        this.isLoading = false;
      }
    )
  }

  ngOnDestroy(): void {
    this.regSub$?.unsubscribe();
  }

}
