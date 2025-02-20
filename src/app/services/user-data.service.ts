import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public readonly userDPS = signal<number>(Number(localStorage.getItem('userDPS')) || 200);
  public readonly userLevel = signal<number>(Number(localStorage.getItem('userLevel')) || 30);

  constructor() {
    // Effect that essentially "debounce" the signal
    effect((onCleanup) => {
      const dps = this.userDPS();
      const timer = setTimeout(() => {
        localStorage.setItem('userDPS', dps.toString());
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      });
    });
    // Effect that essentially "debounce" the signal
    effect((onCleanup) => {
      const level = this.userLevel();

      const timer = setTimeout(() => {
        localStorage.setItem('userLevel', level.toString());
      }, 1000);
      onCleanup(() => {
        clearTimeout(timer);
      });
    });
  }
}
