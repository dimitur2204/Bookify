import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,AfterViewInit {

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
