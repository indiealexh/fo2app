import { Component, signal } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgCartesianSeriesOptions, AgChartOptions, AgStandaloneSeriesOptions } from 'ag-charts-community';
import { LVL_15 } from './data/lvl-15';
import { LVL_16 } from './data/lvl-16';
import { LVL_17 } from './data/lvl-17';
import { LVL_18 } from './data/lvl-18';
import { LVL_19 } from './data/lvl-19';
import { LVL_20 } from './data/lvl-20';
import { LVL_21 } from './data/lvl-21';
import { LVL_22 } from './data/lvl-22';
import { LVL_23 } from './data/lvl-23';
import { LVL_24 } from './data/lvl-24';
import { LVL_25 } from './data/lvl-25';
import { LVL_65 } from './data/lvl-65';
import { LVL_26 } from './data/lvl-26';
import { LVL_27 } from './data/lvl-27';
import { calcAllNegativeXP, calcAllPositiveXP } from '../../xp-calc';
import { ALL_DATA } from './data/all-data';

@Component({
  selector: 'fo2tools-page-xp-graph',
  imports: [
    AgCharts
  ],
  templateUrl: './page-xp-graph.component.html',
  styleUrl: './page-xp-graph.component.scss'
})
export class PageXpGraphComponent {
  options = signal<AgChartOptions>({
    title: {
      text: 'Player Overleveled - Mob XP Drop Graph'
    },
    axes: [
      {
        type: 'number',
        position: 'bottom',
        title: {
          text: 'Player Mob Level Offset'
        },
        keys: ['lvlOffset'],
        interval: {
          step: 1,
        },
        reverse: true,
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: 'Mob XP'
        },
        keys: ['xp'],
        interval: {
          step: 20,
        }
      }
    ],
    series: [
      ...this.generateSeries(),
    ]

  });

  private static readonly maxLvl: number = 70;

  private generateSeries(): AgCartesianSeriesOptions[] {
    const series: AgCartesianSeriesOptions[] = [];
    console.debug("Generating series")

    for (let i = 1; i <= PageXpGraphComponent.maxLvl; i++) {
      console.debug("Generating series for level", i);
      series.push(
        {
          type: 'line',
          // ...ALL_DATA.filter(v => v.playerLvl === i),
          data: [ ...calcAllPositiveXP(i), ...calcAllNegativeXP(i)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
          xKey: 'lvlOffset',
          yKey: 'xp',
          yName: 'PL' + i,
          interpolation: {
            type: 'smooth'
          },
        }
      );
    }
    console.debug("Series generated",series);
    return series;
  }

}

export interface IMobXPDrop {
  playerLvl: number;
  mobLvl: number;
  xp: number;
}

export class MobXPDrop implements IMobXPDrop {

  lvlOffset: number;
  mobLvl: number;
  playerLvl: number;
  xp: number;

  constructor(mobXpDrop: IMobXPDrop) {
    this.mobLvl = mobXpDrop.mobLvl;
    this.playerLvl = mobXpDrop.playerLvl;
    this.xp = mobXpDrop.xp;
    this.lvlOffset = this.mobLvl - this.playerLvl;
  }

}
