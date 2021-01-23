import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();

  isAuth: boolean;

  $authSub: Subscription | null;

  constructor(private authService: AuthService) { 
    this.isAuth = false;
    this.$authSub = null;
  }

  ngOnInit(): void {
    this.$authSub = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(): void {
    this.$authSub?.unsubscribe();
  }

  onLogoutClick(){
    this.authService.logout();
    this.sidenavClose.emit();
  }
}
