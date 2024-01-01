'use client'

import { FormEvent, useState } from 'react'
import { getCurrentCurrencies } from '@/utils/helpers'
import { dates } from '@/utils/dates'
import Header from '@/components/Header'
import ResultsTable from '@/components/ResultsTable'
import CalculationForm from '@/components/CalculationForm'
import Currencies from '@/components/Currencies'
import { ConvertedResult, CurrencyType } from '@/utils/types'

export default function Home() {
  const [currencies, setCurrencies] = useState<CurrencyType>()
  const [selectedDate, setSelectedDate] = useState(dates[0])
  const [convertedResult, setConvertedResult] = useState<ConvertedResult | undefined>()

  const [oldAmount, setOldAmount] = useState<number>()
  const [currentAmount, setCurrentAmount] = useState<number>()

  const onSubmitForm = async (e?: FormEvent) => {
    e?.preventDefault()

    if (!oldAmount || !currentAmount) {
      return
    }

    let currentCurrencies: CurrencyType
    const oldCurrencies = selectedDate.currency

    if (!currencies) {
      const data = await getCurrentCurrencies()
      currentCurrencies = data
      setCurrencies(data)
    } else {
      currentCurrencies = currencies
    }

    const oldUsd = oldAmount / oldCurrencies.usd
    const oldEur = oldAmount / oldCurrencies.eur
    const oldGold = oldAmount / oldCurrencies.gold

    const newUsd = currentAmount / currentCurrencies.usd
    const newEur = currentAmount / currentCurrencies.eur
    const newGold = currentAmount / currentCurrencies.gold

    const expectedUsdToTry = oldUsd * currentCurrencies.usd
    const expectedEurToTry = oldEur * currentCurrencies.eur
    const expectedGoldToTry = oldGold * currentCurrencies.gold

    const differenceUsd = newUsd - oldUsd
    const differenceEur = newEur - oldEur
    const differenceGold = newGold - oldGold

    const differenceUsdToTry = differenceUsd * currentCurrencies.usd
    const differenceEurToTry = differenceEur * currentCurrencies.eur
    const differenceGoldToTry = differenceGold * currentCurrencies.gold

    const response = {
      oldMoney: oldAmount,
      currentMoney: currentAmount,
      oldUsd,
      oldEur,
      oldGold,
      newUsd,
      newEur,
      newGold,
      expectedUsdToTry,
      expectedEurToTry,
      expectedGoldToTry,
      differenceUsd,
      differenceEur,
      differenceGold,
      differenceUsdToTry,
      differenceEurToTry,
      differenceGoldToTry,
    }

    setConvertedResult(response)
  }

  const clearForm = () => {
    setConvertedResult(undefined)
  }

  const onChangeDay = (dateId: number) => {
    const date = dates.find((date) => date.id === dateId)
    if (date) {
      setSelectedDate(date)
      if (convertedResult) {
        onSubmitForm().then()
      } else {
        setConvertedResult(undefined)
        setCurrencies(undefined)
      }
    }
  }

  return (
    <main>
      <div className="relative my:4 lg:my-12 px-6 py-6 lg:px-10 lg:py-9 mx-auto bg-white container rounded-xl shadow-sm">
        <Header />

        <CalculationForm
          selectedDate={selectedDate}
          oldAmount={oldAmount}
          currentAmount={currentAmount}
          onChangeDate={onChangeDay}
          setOldAmount={setOldAmount}
          setCurrentAmount={setCurrentAmount}
          clearForm={clearForm}
          onSubmitForm={onSubmitForm}
        />

        {currencies && <Currencies selectedDate={selectedDate} currencies={currencies} />}

        {convertedResult && <ResultsTable results={convertedResult} />}
      </div>
    </main>
  )
}
