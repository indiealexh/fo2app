import { IMobXPDrop } from './pages/page-xp-graph/page-xp-graph.component';
import { getZeroDifference } from './xp-functions/xp';

export function calcBaseXP(mobLevel: number) {
  return (5 * (mobLevel - 1)) + 50;
}

export function calcXPDrop(mobLevel: number, playerLevel: number) {
  const lvlDiff = mobLevel - playerLevel;
  if (lvlDiff > 10) {
    // XP is capped at 10 lvls above player level
    return 0;
  }
  const baseXp = calcBaseXP(mobLevel);
  if (lvlDiff >= 0) {
    // This only works accurately when the players level is less than the mob level
    const xpAdjustPercent = Math.min(Math.max(0.05 * lvlDiff, -1), 1);
    return Math.round(baseXp + (baseXp * xpAdjustPercent));
  }
  // (Base XP) * (1 - (Char Level - Mob Level)/ZD )
  // (L3) * (1 - (A3 - B3)/18 )
  const xp = (baseXp) * (1 - (playerLevel - mobLevel) / getZeroDifference(playerLevel));
  return xp > 0 ? Math.round(xp) : 0;
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

export function calcAllNegativeXP(playerLevel: number): IMobXPDrop[] {
  const xpDrops: IMobXPDrop[] = [];

  for (let i = playerLevel - 1; i >= playerLevel - 20; i--) {
    const item = {
      playerLvl: playerLevel,
      mobLvl: i,
      xp: calcXPDrop(i, playerLevel)
    };
    xpDrops.push(item);
    if (item.xp <= 0) {
      break;
    }
  }
  console.log(xpDrops);
  return xpDrops;
}
