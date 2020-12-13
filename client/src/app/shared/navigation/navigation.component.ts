import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public isLogged:boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService:AuthService) {}

    ngOnInit(): void {
      this.authService.isLogged.subscribe(logged => {
        this.isLogged = logged;
      })
    }

    loginHandler():void{
      this.authService.logIn();
    }
    registerHandler():void{
      this.authService.logIn();
    }
}
