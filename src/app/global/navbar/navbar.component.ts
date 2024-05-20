import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CoingeckoService } from '../../service/coingecko.service';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink, NgbModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  searchQuery: string = ''; // Declaring a searchQuery string to hold the search input

  constructor(
    private readonly router: Router,
    private readonly coingeckoService: CoingeckoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Subscribing to router events to detect navigation start events
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart)) // Filtering for NavigationStart events
      .subscribe((e) => {
        const navigation = this.router.getCurrentNavigation(); // Getting the current navigation
        this.onRouteChange(); // Calling the method to handle route change
      });
  }

  /**
   * Executes logic to scroll to the top of the page when a route changes.
   */
  onRouteChange(): void {
    // Method to execute logic when a route changes
    window.scrollTo(0, 0);
  }

  /**
   * Performs a search using the CoingeckoService.
   * Opens a modal with the search results.
   */
  search(): void {
    // Method to perform a search using the CoingeckoService
    // Calling the search function in CoingeckoService with the searchQuery parameter
    this.coingeckoService.getSearch(this.searchQuery).subscribe(
      (data) => {
        // Handling the success scenario
        this.openModal(data); // Opening a modal with the search data
      },
      (error) => {
        // Handling errors if the API call fails
        // If an error occurs, load data from a local JSON file as a fallback
        this.coingeckoService.loadLocalSearch().subscribe((data) => {
          this.openModal(data); // Opening a modal with the local search data
        });
      }
    );
  }

  /**
   * Opens a modal with the provided search result.
   * @param result The search result to display in the modal.
   */
  openModal(result: any) {
    // Method to open a modal with the search result
    const modalRef = this.modalService.open(ModalComponent, {
      size: 'lg', // Setting the modal size to large
      scrollable: true, // Making the modal scrollable
    });
    modalRef.componentInstance.searchResult = result.coins; // Passing the search result to the modal component instance
  }
}
