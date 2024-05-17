import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  searchResult: any[] = [];

  constructor(private router: Router, private modalService: NgbModal) {}

  closeModal() {
    this.modalService.dismissAll(ModalComponent);
  }
}
