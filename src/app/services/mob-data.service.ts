import { Injectable, resource } from '@angular/core';
import { Mob } from '../models/mobs';

@Injectable({
  providedIn: 'root'
})
export class MobDataService {

  private _mobData = resource({
    request: () => ({}),
    loader: (request) => fetch('/fo2mobs.json').then(res => res.json()).then(data => data["mobs"] as Mob[])
  });
  public mobData = this._mobData.asReadonly();

  constructor() {
  }
}
