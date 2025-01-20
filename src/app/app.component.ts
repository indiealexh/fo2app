import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { MobDataService } from './services/mob-data.service';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { Drop } from './models/mobs';

ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'fo2tools-root',
  imports: [RouterOutlet, AgGridAngular],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  mobData = inject(MobDataService);

  constructor() {
    effect(() => {
      const data = this.mobData.mobData.value();
      if (data) {

        this.rowData.set(data.map(m => {
          const goldAvg = (m.goldMin ?? 0) + (m.goldMax ?? 0) / 2;
          const dropValue = m.drops ? this.itemValueChangeToGold(m.drops) : 0;
          const valuePerHp = (dropValue + goldAvg) / (m.health ?? 0);
          return ({
            name: m.name,
            goldMin: m.goldMin,
            goldMax: m.goldMax,
            goldAvg: goldAvg,
            hp: m.health,
            goldPerHp: goldAvg / (m.health??0),
            dropValue: dropValue,
            overallAvgValue: dropValue + goldAvg,
            valuePerHp: valuePerHp,
          })
        }) as MobRow[]);
      }
    });
  }

  itemValueChangeToGold(drops: Drop[]) {
    let gold = 0;

    for (const drop of drops) {
      gold += drop.item!.sellPrice! * ((drop.dropRate! / 100) * (drop.count ?? 1));
    }

    return gold;
  }


  rowData = signal<MobRow[]>([])

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {field: "name"},
    {field: "goldMin"},
    {field: "goldMax"},
    {field: "goldAvg"},
    {field: "hp"},
    {field: "goldPerHp"},
    {field: "dropValue"},
    {field: "overallAvgValue"},
    {field: "valuePerHp"},
  ];


}

export interface MobRow {
  name: string;
  goldMin: number;
  goldMax: number;
  goldAvg: number;
  hp: number;
  goldPerHp: number;
  dropValue: number;
  overallAvgValue: number;
  valuePerHp: number;
}
