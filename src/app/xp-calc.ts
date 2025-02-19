import { IMobXPDrop, MobXPDrop } from './pages/page-xp-graph/page-xp-graph.component';

export function calcBaseXP(mobLevel: number) {
  return (5 * (mobLevel - 1)) + 50;
}

export function calcXPDrop(mobLevel: number, playerLevel: number) {
  const lvlDiff = mobLevel - playerLevel;
  if (lvlDiff > 10) {
    return 0;
  }
  // This only works accurately when the players level is less than the mobs, but close enough for now
  const xpAdjustPercent = Math.min(Math.max(0.05 * lvlDiff, -1), 1);
  const baseXp = calcBaseXP(mobLevel);
  return Math.round(baseXp + (baseXp * xpAdjustPercent));
}

export function calcAllPositiveXP(playerLevel: number): IMobXPDrop[] {
  const xpDrops: IMobXPDrop[] = [];
  for (let i = playerLevel; i <= playerLevel + 10; i++) {
    xpDrops.push({
      playerLvl: playerLevel,
      mobLvl: i,
      xp: calcXPDrop(i, playerLevel)
    });
  }
  console.log(xpDrops);
  return xpDrops;
}
