export type CurrencyResponse = {
  usd: number
  eur: number
  gold: number
}

export type CurrencyType = CurrencyResponse & {
  minimumWage: number
}

export type DateType = {
  id: number
  text: string
  currency: CurrencyType
}

export type ConvertedResult = {
  oldMoney: number
  currentMoney: number
  oldUsd: number
  oldEur: number
  oldGold: number
  oldMinimumWage: number
  newUsd: number
  newEur: number
  newGold: number
  newMinimumWage: number
  expectedUsdToTry: number
  expectedEurToTry: number
  expectedGoldToTry: number
  expectedMinimumWageToTry: number
  differenceUsd: number
  differenceEur: number
  differenceGold: number
  differenceMinimumWage: number
  differenceUsdToTry: number
  differenceEurToTry: number
  differenceGoldToTry: number
  differenceMinimumWageToTry: number
}
