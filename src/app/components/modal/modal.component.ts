import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  searchResult: any[] = [];

  constructor(private router: Router, private modalService: NgbModal) {}

  closeModal() {
    this.modalService.dismissAll(ModalComponent);
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
