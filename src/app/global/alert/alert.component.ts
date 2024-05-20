import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from '../../service/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(protected alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alert$.subscribe((alert) => {
      if (alert) {
        this.alerts.push(alert);
        setTimeout(() => this.removeAlert(alert), 5000); // Auto hide after 3 seconds
      }
    });
  }

  /**
   * Removes the specified alert from the alerts array and clears the alert.
   * @param alertToRemove The alert to be removed.
   */
  removeAlert(alertToRemove: Alert) {
    this.alerts = this.alerts.filter((alert) => alert !== alertToRemove);
    this.alertService.clearAlert();
  }
}
