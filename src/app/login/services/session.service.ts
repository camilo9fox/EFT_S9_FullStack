import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private isLogged = new BehaviorSubject<boolean>(false);

  isLogged$ = this.isLogged.asObservable();
  constructor() {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  closeSession() {
    if (this.isBrowser()) {
      if (localStorage.getItem('actual_user')) {
        localStorage.removeItem('actual_user');
        localStorage.setItem('close_session', 'true');
        this.isLogged.next(false);
      }
    }
  }

  getStatusLogin() {
    if (this.isBrowser()) {
      if (localStorage.getItem('actual_user')) {
        this.isLogged.next(true);
      }
    }
  }

  isLoggedIn() {
    if (this.isBrowser()) {
      return localStorage.getItem('actual_user');
    }
    return false;
  }
}
