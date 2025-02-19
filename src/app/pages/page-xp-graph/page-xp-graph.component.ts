import { Component, signal } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
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
import { calcAllPositiveXP } from '../../xp-calc';

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
      {
        type: 'line',
        data: LVL_65.map(d => new MobXPDrop(d)),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL65'
      },
      {
        type: 'line',
        data: [...LVL_27, ...calcAllPositiveXP(27)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL27'
      },
      {
        type: 'line',
        data: [...LVL_26, ...calcAllPositiveXP(26)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL26'
      },
      {
        type: 'line',
        data: [...LVL_25, ...calcAllPositiveXP(25)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL25'
      },
      {
        type: 'line',
        data: [...LVL_24, ...calcAllPositiveXP(24)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL24'
      },
      {
        type: 'line',
        data: [...LVL_23, ...calcAllPositiveXP(23)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL23'
      },
      {
        type: 'line',
        data: [...LVL_22, ...calcAllPositiveXP(22)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL22'
      },
      {
        type: 'line',
        data: [...LVL_21, ...calcAllPositiveXP(21)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL21'
      },
      {
        type: 'line',
        data: [...LVL_20, ...calcAllPositiveXP(20)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL20'
      },
      {
        type: 'line',
        data: [...LVL_19, ...calcAllPositiveXP(19)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL19'
      },
      {
        type: 'line',
        data: [...LVL_18, ...calcAllPositiveXP(18)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL18'
      },
      {
        type: 'line',
        data: [...LVL_17, ...calcAllPositiveXP(17)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL17'
      },
      {
        type: 'line',
        data: [...LVL_16, ...calcAllPositiveXP(16)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL16'
      },
      {
        type: 'line',
        data: [...LVL_15, ...calcAllPositiveXP(15)].map(d => new MobXPDrop(d)).sort((a, b) => a.lvlOffset - b.lvlOffset),
        xKey: 'lvlOffset',
        yKey: 'xp',
        yName: 'PL15'
      }
    ]

  });

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
