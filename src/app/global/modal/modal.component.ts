import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  searchResult: any[] = []; // Declaring an array to hold the search results

  constructor(private modalService: NgbModal) {}

  /**
   * Closes the currently open modal.
   */
  closeModal() {
    // Method to close the modal
    this.modalService.dismissAll(); // Dismissing all modals
  }
}
