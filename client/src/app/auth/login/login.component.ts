import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,AfterViewInit {

  @ViewChild('emailInput') emailInput:ElementRef|null;
  hidePass = true;

  constructor() {
    this.emailInput = null;
   }
  ngAfterViewInit(): void {
    this.emailInput?.nativeElement.focus();
  }

  ngOnInit(): void {
  }

}
