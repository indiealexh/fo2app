import { Injectable, resource } from '@angular/core';
import { MobData } from '../models/fo2-data';

@Injectable({
  providedIn: 'root'
})
export class MobDataService {

  private _mobData = resource({
    request: () => ({}),
    loader: (request) => fetch('/fo2mobs.json').then(res => res.json()).then(data => data["mobs"] as MobData[])
  });
  public mobData = this._mobData.asReadonly();

  constructor() {
  }
}
