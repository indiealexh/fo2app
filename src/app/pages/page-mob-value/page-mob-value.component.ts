import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { AllCommunityModule, ColDef, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { MobDataService } from '../../services/mob-data.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Drop } from '../../models/mobs';
import { FormsModule } from '@angular/forms';


ModuleRegistry.registerModules([AllCommunityModule]);


@Component({
  selector: 'fo2tools-page-mob-value',
  imports: [
    AgGridAngular,
    FormsModule
  ],
  templateUrl: './page-mob-value.component.html',
  styleUrl: './page-mob-value.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PageMobValueComponent {

  dps = signal(200);

  mobData = inject(MobDataService);

  constructor() {
    effect(() => {
      const data = this.mobData.mobData.value();
      if (data) {

        this.rowData.set(data.map(m => {
          const goldAvg = (m.goldMin ?? 0) + (m.goldMax ?? 0) / 2;
          const dropValue = m.drops ? this.itemValueChangeToGold(m.drops) : 0;
          const overallAvgValue = dropValue + goldAvg;
          const valuePerHp =  overallAvgValue / (m.health ?? 0);
          return ({
            name: m.name,
            goldMin: m.goldMin,
            goldMax: m.goldMax,
            goldAvg: goldAvg,
            hp: m.health,
            goldPerHp: goldAvg / (m.health ?? 0),
            dropValue: dropValue,
            overallAvgValue: overallAvgValue,
            valuePerHp: valuePerHp,
            valuePerSecond: valuePerHp * ((m.atkSpeed !== 0 ? this.dps() : 1)),
          })
        }) as MobRow[]);
      }
    });
  }

  // to use myTheme in an application, pass it to the theme grid option
  myTheme = themeQuartz
    .withParams({
      backgroundColor: "#0E0B1C",
      fontFamily: {
        googleFont: "IBM Plex Mono"
      },
      foregroundColor: "#F1F1F1"
    });

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
    {field: "hp", filter: true},
    {field: "goldPerHp", filter: true},
    {field: "dropValue", filter: true},
    {field: "overallAvgValue", filter: true},
    {field: "valuePerHp", filter: true},
    {field: "valuePerSecond", filter: true},
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
  valuePerSecond: number;
}
