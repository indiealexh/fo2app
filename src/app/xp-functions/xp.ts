export function getZeroDifference(playerLevel: number) {
  let zd = 0;
  if (playerLevel >= 1 && playerLevel <= 7) zd = 5;
  if (playerLevel >= 8 && playerLevel <= 9) zd = 6;
  if (playerLevel >= 10 && playerLevel <= 11) zd = 7;
  // 15 = 8
  if (playerLevel >= 12 && playerLevel <= 15) zd = 8;
  // 16 - 19 = 9
  if (playerLevel >= 16 && playerLevel <= 19) zd = 9;
  // 20 - 28 = 11
  if (playerLevel >= 20 && playerLevel <= 29) zd = 11;
  if (playerLevel >= 30 && playerLevel <= 39) zd = 12;
  // 40 = 14
  if (playerLevel >= 40 && playerLevel <= 44) zd = 14;
  if (playerLevel >= 45 && playerLevel <= 49) zd = 14;
  if (playerLevel >= 50 && playerLevel <= 54) zd = 15;
  if (playerLevel >= 55 && playerLevel <= 59) zd = 16;
  if (playerLevel >= 60 && playerLevel <= 64) zd = 17;
  // 65 = 18
  if (playerLevel >= 65 && playerLevel <= 69) zd = 18;
  if (playerLevel >= 70 && playerLevel <= 79) zd = 20;
  console.log("ZD:", zd);
  return zd;
}
