import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})

export class NavbarComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe((e) => {
        const navigation = this.router.getCurrentNavigation();
        console.log(navigation);
      });
  }

  onRouteChange(): void {
    // Execute any logic you want to perform when a route changes
    console.log('Route changed');
  }

  goTo(path: string, params: any[] = []) {
    let navigationParams: any[];

    if (params.length > 0) {
      navigationParams = [path, ...params];
    } else {
      navigationParams = [path];
    }

    this.router.navigate(navigationParams);
  }
}
