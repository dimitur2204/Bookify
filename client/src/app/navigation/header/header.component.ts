import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle = new EventEmitter<void>();

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

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  onLogoutClick(){
    this.authService.logout();
  }
}
