import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coins',
  standalone: true,
  imports: [],
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.css',
})
export class CoinsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Access the tracing ID from route parameters
    this.route.params.subscribe((params) => {
      console.log(this.route);
    });
  }
}
