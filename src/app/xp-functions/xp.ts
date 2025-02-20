export function getZeroDifference(playerLevel: number) {
  let zd = 0;
  if (playerLevel >= 1 && playerLevel <= 9) zd = 1;
  if (playerLevel >= 10 && playerLevel <= 15) zd = 8;
  if (playerLevel >= 20 && playerLevel <= 29) zd = 10;
  if (playerLevel >= 30 && playerLevel <= 39) zd = 12;
  if (playerLevel >= 40 && playerLevel <= 49) zd = 14;
  if (playerLevel >= 50 && playerLevel <= 59) zd = 16;
  if (playerLevel >= 60 && playerLevel <= 69) zd = 18;
  if (playerLevel >= 70 && playerLevel <= 79) zd = 20;
  console.log("ZD:",zd);
  return zd;
}
