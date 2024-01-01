export type CurrencyType = {
  usd: number,
  eur: number,
  gold: number
}

export type DateType = {
  id: number;
  text: string;
  currency: CurrencyType
}

export type ConvertedResult = {
  oldMoney: number
  currentMoney: number
  oldUsd: number
  oldEur: number
  oldGold: number
  newUsd: number
  newEur: number
  newGold: number
  expectedUsdToTry: number
  expectedEurToTry: number
  expectedGoldToTry: number
  differenceUsd: number
  differenceEur: number
  differenceGold: number
  differenceUsdToTry: number
  differenceEurToTry: number
  differenceGoldToTry: number
}
