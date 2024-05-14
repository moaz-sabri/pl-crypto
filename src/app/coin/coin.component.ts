import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coin',
  standalone: true,
  imports: [],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.css',
})
export class CoinComponent {
  constructor(private route: ActivatedRoute) {
    // Access the ID parameter
    this.route.params.subscribe((params) => {
      const id = params['id']; // Access the 'id' parameter value
      console.log(id); // Check if the ID is retrieved correctly
    });
  }
}
