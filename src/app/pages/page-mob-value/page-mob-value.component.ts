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
import { calcXPDrop } from '../../xp-calc';
import { UserDataService } from '../../services/user-data.service';


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
  userDataService = inject(UserDataService);

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


  lvl = this.userDataService.userLevel;
  dps = this.userDataService.userDPS;

  mobData = inject(MobDataService);

  // Column Definitions: Defines the columns to be displayed.
  colDefs = computed<ColDef[]>(() => [
    {field: "image", width: 32, cellRenderer: AnimatedImageAgGridCellRendererComponent},
    {field: "name"},
    {field: "region", filter: true},
    {field: "level", filter: true},
    {
      field: "estXP",
      headerName: "XP",
      headerTooltip: "Estimated XP Drop based on player level and mob level",
      hide: this.hideXpColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {field: "hp", filter: true},
    {
      field: "xpToHpRatio",
      headerName: "XP:HP",
      headerTooltip: "Estimated XP to HP Ratio",
      hide: this.hideXpColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {
      field: "xpPerMinute",
      headerName: "XP/m",
      headerTooltip: "Estimated XP per second, does not account for spawn rate or mob count",
      hide: this.hideXpColumns(),
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
      field: "valuePerMinute",
      headerName: "Value/m",
      headerTooltip: "Value per second, does not account for spawn rate or mob count",
      hide: this.hideGoldColumns(),
      filter: true,
      valueFormatter: (params) => this.roundNum(params.value).toString()
    },
    {field: "faction", hide: this.hideFactionXpColumns(), filter: true},
    {field: "factionXp", hide: this.hideFactionXpColumns(), filter: true},
    {
      field: "factionXpToHpRatio",
      headerName: "Faction XP:HP",
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
          const goldAvg = ((m.goldMin ?? 0) + (m.goldMax ?? 0)) / 2;
          const dropValue = m.drops ? this.itemValueChangeToGold(m.drops) : 0;
          const overallAvgValue = dropValue + goldAvg;
          const valuePerHp = overallAvgValue / (m.health ?? 0);
          const region = m.locations?.at(0)?.area?.name ?? "Unknown";
          const baseXP = m.level ? ((5 * (m.level - 1)) + 50) : 0;
          const estXP = calcXPDrop(m.level ?? 0, this.lvl());
          const xpPerHp = estXP / (m.health ?? 0);
          let killsPerSecond = this.dps() / (m.health ?? 1);
          // If the mobs attackspeed is 0 then it likley is a chest, or inanimate object and we should assume the DPS is 1
          if (m.atkSpeed == 0) {
            killsPerSecond = 1.5 / (m.health ?? 1);
          }
          const killsPerMinute = killsPerSecond * 60;

          // DPS / HP = Kills Per second

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
            valuePerMinute: dropValue * killsPerMinute,
            xpToHpRatio: xpPerHp,
            baseXp: baseXP,
            estXP: estXP,
            xpPerMinute: estXP * killsPerMinute,
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
  valuePerMinute: number;
  xpToHpRatio: number;
  baseXp: number;
  estXP: number;
  xpPerMinute: number;
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
