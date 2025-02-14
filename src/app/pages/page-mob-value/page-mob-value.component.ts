import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import {
  AllCommunityModule,
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridOptions,
  ModuleRegistry,
  SizeColumnsToContentStrategy,
  themeQuartz
} from 'ag-grid-community';
import { MobDataService } from '../../services/mob-data.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Drop } from '../../models/mobs';
import { FormsModule } from '@angular/forms';
import {
  AnimatedImageAgGridCellRendererComponent
} from '../../ag-grid/animated-image-ag-grid-cell-renderer/animated-image-ag-grid-cell-renderer.component';


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


  gridMode = signal(GridModeEnum.All);

  hideGoldColumns = computed(() => {
    const gm = this.gridMode();
    return gm != GridModeEnum.All && gm != GridModeEnum.Gold;
  });
  hideXpColumns = computed(() => {
    const gm = this.gridMode();
    return gm != GridModeEnum.All && gm != GridModeEnum.XP;
  });
  hideFactionXpColumns = computed(() => {
    const gm = this.gridMode();
    return gm != GridModeEnum.All && gm != GridModeEnum.FactionXP;
  });


  lvl = signal<number>(30);
  dps = signal(200);

  mobData = inject(MobDataService);

  // Column Definitions: Defines the columns to be displayed.
  colDefs = computed<ColDef[]>(() => [
    {field: "image", width: 32, cellRenderer: AnimatedImageAgGridCellRendererComponent},
    {field: "name"},
    {field: "region", filter: true},
    {field: "level", filter: true},
    {field: "baseXp", hide: this.hideXpColumns(), filter: true},
    {
      field: "estXP",
      hide: this.hideXpColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {field: "hp", filter: true},
    {
      field: "xpToHpRatio",
      hide: this.hideXpColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {field: "goldMin", hide: this.hideGoldColumns()},
    {field: "goldMax", hide: this.hideGoldColumns()},
    {
      field: "goldAvg",
      hide: this.hideGoldColumns(),
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {
      field: "goldPerHp",
      hide: this.hideGoldColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {
      field: "dropValue",
      hide: this.hideGoldColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {
      field: "overallAvgValue",
      hide: this.hideGoldColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {
      field: "valuePerHp",
      hide: this.hideGoldColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {
      field: "valuePerSecond",
      hide: this.hideGoldColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {field: "faction", hide: this.hideFactionXpColumns(), filter: true},
    {field: "factionXp", hide: this.hideFactionXpColumns(), filter: true},
    {
      field: "factionXpToHpRatio",
      hide: this.hideFactionXpColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
  ]);

  gridOptions = signal<GridOptions<MobRow> | undefined>({
    rowHeight: 64
  });

  autoSizeStrategy: SizeColumnsToContentStrategy = {
    type: 'fitCellContents'
  };

  constructor() {
    effect(() => {
      const data = this.mobData.mobData.value();
      if (data) {

        this.rowData.set(data.map(m => {
          const goldAvg = (m.goldMin ?? 0) + (m.goldMax ?? 0) / 2;
          const dropValue = m.drops ? this.itemValueChangeToGold(m.drops) : 0;
          const overallAvgValue = dropValue + goldAvg;
          const valuePerHp = overallAvgValue / (m.health ?? 0);
          const region = m.locations?.at(0)?.area?.name ?? "Unknown";
          const baseXP = m.level ? ((5 * (m.level - 1)) + 50) : 0;
          return ({
            id: m.id,
            image: `https://art.fantasyonline2.com/textures/enemies/${m.spriteName}.png`,
            name: m.name,
            region: region,
            level: m.level,
            hp: m.health,
            goldMin: m.goldMin,
            goldMax: m.goldMax,
            goldAvg: goldAvg,
            goldPerHp: goldAvg / (m.health ?? 0),
            dropValue: dropValue,
            overallAvgValue: overallAvgValue,
            valuePerHp: valuePerHp,
            valuePerSecond: valuePerHp * ((m.atkSpeed !== 0 ? this.dps() : 1)),
            xpToHpRatio: this.calcXPDrop(m.level ?? 0, this.lvl()) / (m.health ?? 0),
            baseXp: baseXP,
            estXP: this.calcXPDrop(m.level ?? 0, this.lvl()),
            faction: m.faction?.name ?? "Unknown",
            factionXp: m.factionXp ?? 0,
            factionXpToHpRatio: (m.factionXp ?? 0) / (m.health ?? 0),
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

  roundNum(num: number) {
    return parseFloat(num.toFixed(4));
  }

  itemValueChangeToGold(drops: Drop[]) {
    let gold = 0;

    for (const drop of drops) {
      gold += drop.item!.sellPrice! * ((drop.dropRate! / 100) * (drop.count ?? 1));
    }

    return gold;
  }

  calcBaseXP(mobLevel: number) {
    return (5 * (mobLevel - 1)) + 50;
  }

  calcXPDrop(mobLevel: number, playerLevel: number) {
    const lvlDiff = mobLevel - playerLevel;
    if (lvlDiff > 10) {
      return 0;
    }
    // This only works accurately when the players level is less than the mobs, but close enough for now
    const xpAdjustPercent = Math.min(Math.max(0.05 * lvlDiff, -1), 1);
    const baseXp = this.calcBaseXP(mobLevel);
    return Math.round(baseXp + (baseXp * xpAdjustPercent));
  }


  rowData = signal<MobRow[]>([])

  getRowId: GetRowIdFunc = (params: GetRowIdParams) =>
    String(params.data.id);

  enumGridMode = GridModeEnum;


}

export interface MobRow {
  id: number;
  image: string;
  name: string;
  region: string;
  level: number;
  goldMin: number;
  goldMax: number;
  goldAvg: number;
  hp: number;
  goldPerHp: number;
  dropValue: number;
  overallAvgValue: number;
  valuePerHp: number;
  valuePerSecond: number;
  xpToHpRatio: number;
  baseXp: number;
  estXP: number;
  faction: string;
  factionXp: number;
  factionXpToHpRatio: number;
}

export enum GridModeEnum {
  All,
  Gold,
  XP,
  FactionXP,
}
