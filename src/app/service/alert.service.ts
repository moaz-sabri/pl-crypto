import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Alert {
  type: 'success' | 'danger' | 'warning' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  public alert$ = this.alertSubject.asObservable();

  /**
   * Shows an alert message.
   * Emits an alert of the specified type with the given message.
   * @param type The type of the alert: 'success', 'danger', 'warning', or 'info'.
   * @param message The message to be displayed in the alert.
   */
  showAlert(type: 'success' | 'danger' | 'warning' | 'info', message: string) {
    this.alertSubject.next({ type, message });
  }

  /**
   * Clears the currently displayed alert.
   * Emits a null value to clear the alert.
   */
  clearAlert() {
    this.alertSubject.next(null);
  }
}
