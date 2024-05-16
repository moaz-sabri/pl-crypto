import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CoingeckoService } from '../../service/coingecko.service';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, NgbModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coingeckoService: CoingeckoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe((e) => {
        const navigation = this.router.getCurrentNavigation();
      });
  }

  onRouteChange(): void {
    // Execute any logic you want to perform when a route changes
    console.log('Route changed');
  }

  search(): void {
    // Call the function in CoingeckoService with the searchQuery parameter
    this.coingeckoService.getSearch(this.searchQuery).subscribe(
      (data) => {
        // Open modal with the search data
        this.openModal(data);
      },
      (error) => {
        // Handle errors if any
        // If useApi is false, load data from local JSON
        this.coingeckoService.loadLocalSearch().subscribe((data) => {
          // Open modal with the search result
          this.openModal(data);
        });
      }
    );
  }

  openModal(result: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      size: 'lg',
      scrollable: true,
    });
    modalRef.componentInstance.searchResult = result.coins;
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
