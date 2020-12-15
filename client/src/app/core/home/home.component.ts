import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isLogged:boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.isLogged.subscribe(logged => {
      this.isLogged = logged;
    })
  }

}
