import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isLogged:boolean = false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.isLogged.subscribe(logged => {
      this.isLogged = logged;
    })
  }

}
