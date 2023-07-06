'use client'

import {useMemo, useState} from "react";
import Image from 'next/image'
import {getCurrentCurrencies} from "@/helpers";

export default function Home() {

  const days = useMemo(() => {
    return [
      {
        id: 1,
        text: "2 Ocak 2023",
        currency: {
          usd: 18.7029,
          eur: 19.9806,
          gold: 1097
        }
      }
    ]
  }, []);

  const [selectedDay, setSelectedDay] = useState(days[0])

  const [convertedResult, setConvertedResult] = useState<any>(null)

  const [oldMoney, setOldMoney] = useState<number>()
  const [currentMoney, setCurrentMoney] = useState<number>()

  const [currencies, setCurrencies] = useState<{ usd: number, eur: number, gold: number }>()

  const onSubmitForm = async (e: any) => {
    e.preventDefault()

    if (!oldMoney || !currentMoney) {
      return
    }

    let currentCurrencies: { usd: number, eur: number, gold: number }
    const oldCurrencies = selectedDay.currency

    if (!currencies) {
      const data = await getCurrentCurrencies()
      currentCurrencies = data
      setCurrencies(data)
    } else {
      currentCurrencies = currencies
    }

    const oldUsd = (oldMoney / oldCurrencies.usd)
    const oldEur = (oldMoney / oldCurrencies.eur)
    const oldGold = (oldMoney / oldCurrencies.gold)

    const newUsd = (currentMoney / currentCurrencies.usd)
    const newEur = (currentMoney / currentCurrencies.eur)
    const newGold = (currentMoney / currentCurrencies.gold)

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
      oldMoney: oldMoney,
      currentMoney: currentMoney,
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
      differenceGoldToTry
    }

    setConvertedResult(response)
  }

  const clearForm = () => {
    setConvertedResult(undefined)
  }

  const onChangeDay = (dayId: string) => {
    const day = days.find(day => day.id === Number(dayId))
    if (day) {
      setSelectedDay(day)
    }
  }

  return (
    <main>
      <form
        className="relative mt:4 lg:mt-12 px-6 py-6 lg:px-10 lg:py-9 mx-auto bg-white container rounded-xl shadow-sm"
        onSubmit={onSubmitForm}>

        <a className="absolute top-5 right-5" href="https://github.com/orcuntuna/parama-ne-oldu" target="_blank">
          <Image
            src={require('@/app/github.svg')}
            width={28}
            height={28}
            alt="Source Code on GitHub"
          />
        </a>

        <div>
          <h1 className="text-3xl font-semibold mb-0.5">Parama ne oldu?</h1>
          <h2 className="text-xl text-gray-600">Paranızın döviz karşısında ne kadar eridiğini kolayca görün.</h2>
        </div>

        <div className="mt-10 flex lg:space-x-8 flex-col lg:flex-row">
          <div className="lg:flex-1">
            <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">Başlangıç
              Tarihi</label>
            <select id="start-date" name="location"
                    value={selectedDay.id}
                    onChange={(e) => onChangeDay(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6">
              {days.map(day => (
                <option key={day.id} value={day.id}>{day.text}</option>
              ))}
            </select>
          </div>
          <div className="lg:flex-1 mt-4 lg:mt-0">
            <label htmlFor="start-money" className="block text-sm font-medium leading-6 text-gray-900">Başlangıç Ücreti
              (TL)</label>
            <div className="mt-2">
              <input required={true} value={String(oldMoney) || ""} onChange={e => setOldMoney(Number(e.target.value))}
                     type="number"
                     id="start-money"
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                     placeholder="TL cinsinden miktar girin"/>
            </div>
          </div>
          <div className="lg:flex-1 mt-4 lg:mt-0">
            <label htmlFor="end-money" className="block text-sm font-medium leading-6 text-gray-900">Bugünkü Ücret
              (TL)</label>
            <div className="mt-2">
              <input required={true} value={String(currentMoney) || ""}
                     onChange={e => setCurrentMoney(Number(e.target.value))}
                     type="number" id="end-money"
                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                     placeholder="TL cinsinden miktar girin"/>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end space-x-4">
          <button type="button" onClick={clearForm}
                  className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Sıfırla
          </button>
          <button type="submit"
                  className="flex justify-center items-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            Hesapla
          </button>
        </div>

        {
          currencies && (
            <div className="mt-4">
              <h2 className="text-lg font-medium">Kur Farklılıkları</h2>
              <ul role="list" className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-3 sm:gap-6 xl:grid-cols-4">
                <li className="col-span-1 flex rounded-md shadow-sm">
                  <div
                    className="flex w-16 flex-shrink-0 items-center justify-center bg-green-600 rounded-l-md text-sm font-medium text-white">USD
                  </div>
                  <div
                    className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <div className="font-medium text-gray-900 hover:text-gray-600 mb-1">Dolar</div>
                      <p className="text-gray-500">{selectedDay.text}: <span
                        className="font-medium text-black">{selectedDay.currency.usd}</span></p>
                      <p className="text-gray-500">Bugün: <span className="font-medium text-black">{currencies.usd}</span>
                      </p>
                    </div>

                  </div>
                </li>
                <li className="col-span-1 flex rounded-md shadow-sm">
                  <div
                    className="flex w-16 flex-shrink-0 items-center justify-center bg-blue-500 rounded-l-md text-sm font-medium text-white">EUR
                  </div>
                  <div
                    className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <div className="font-medium text-gray-900 hover:text-gray-600 mb-1">Euro</div>
                      <p className="text-gray-500">{selectedDay.text}: <span
                        className="font-medium text-black">{selectedDay.currency.eur}</span></p>
                      <p className="text-gray-500">Bugün: <span className="font-medium text-black">{currencies.eur}</span>
                      </p>
                    </div>

                  </div>
                </li>
                <li className="col-span-1 flex rounded-md shadow-sm">
                  <div
                    className="flex w-16 flex-shrink-0 items-center justify-center bg-amber-600 rounded-l-md text-sm font-medium text-white">Altın
                  </div>
                  <div
                    className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <div className="font-medium text-gray-900 hover:text-gray-600 mb-1">Altın</div>
                      <p className="text-gray-500">{selectedDay.text}: <span
                        className="font-medium text-black">{selectedDay.currency.gold}</span></p>
                      <p className="text-gray-500">Bugün: <span
                        className="font-medium text-black">{currencies.gold}</span></p>
                    </div>

                  </div>
                </li>
              </ul>
            </div>
          )
        }

        {convertedResult && (
          <div className="mt-10">
            <div className="flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                      <tr>
                        <th scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Birim Adı
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Eski
                          (Birim)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Yeni
                          (Birim)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Olması
                          Beklenen (TL)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fark
                          (Birim)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fark
                          (TL)
                        </th>

                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">

                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Dolar
                          (USD)
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(convertedResult.oldUsd)} $
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(convertedResult.newUsd)} $
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(convertedResult.expectedUsdToTry)} TL
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${convertedResult.differenceUsd < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(convertedResult.differenceUsd)} $
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${convertedResult.differenceUsdToTry < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(convertedResult.differenceUsdToTry)} TL
                        </td>
                      </tr>

                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Euro
                          (EUR)
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(convertedResult.oldEur)} €
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(convertedResult.newEur)} €
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(convertedResult.expectedEurToTry)} TL
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${convertedResult.differenceEur < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(convertedResult.differenceEur)} €
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${convertedResult.differenceEurToTry < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(convertedResult.differenceEurToTry)} TL
                        </td>
                      </tr>

                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Altın
                          (Gram)
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(convertedResult.oldGold)} gram
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(convertedResult.newGold)} gram
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(convertedResult.expectedGoldToTry)} TL
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${convertedResult.differenceGold < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(convertedResult.differenceGold)} gram
                        </td>
                        <td
                          className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${convertedResult.differenceGoldToTry < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(convertedResult.differenceGoldToTry)} TL
                        </td>
                      </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </form>
    </main>
  )
}
