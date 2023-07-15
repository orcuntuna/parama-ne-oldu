"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { getCurrentCurrencies } from "@/helpers";
import CurrencyInput from "@/components/currency-input";
import { Controller, useForm } from "react-hook-form";
import CurrencyCard from "@/components/currency-card";
import CurrencySpan from "@/components/currency-span";
import Button from "@/components/button";

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
    ];
  }, []);
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [convertedResult, setConvertedResult] = useState<any>(null);
  const [currencies, setCurrencies] = useState<{
    usd: number;
    eur: number;
    gold: number;
  }>();

  const onSubmitForm = async (values: any) => {
    let currentCurrencies: { usd: number; eur: number; gold: number };

    const data = await getCurrentCurrencies();
    currentCurrencies = data;
    setCurrencies(data);

    const oldUsd = values.startMoney / values.location.currency.usd;
    const oldEur = values.startMoney / values.location.currency.eur;
    const oldGold = values.startMoney / values.location.currency.gold;
    const newUsd = values.endMoney / currentCurrencies.usd;
    const newEur = values.endMoney / currentCurrencies.eur;
    const newGold = values.endMoney / currentCurrencies.gold;

    const expectedUsdToTry = oldUsd * currentCurrencies.usd;
    const expectedEurToTry = oldEur * currentCurrencies.eur;
    const expectedGoldToTry = oldGold * currentCurrencies.gold;

    const differenceUsd = newUsd - oldUsd;
    const differenceEur = newEur - oldEur;
    const differenceGold = newGold - oldGold;

    const differenceUsdToTry = differenceUsd * currentCurrencies.usd;
    const differenceEurToTry = differenceEur * currentCurrencies.eur;
    const differenceGoldToTry = differenceGold * currentCurrencies.gold;

    const response = {
      oldMoney: getValues("startMoney"),
      currentMoney: getValues("endMoney"),
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
    };

    setConvertedResult(response);
  };

  const clearForm = () => {
    reset({
      location: days[0],
      startMoney: "",
      endMoney: ""
    });
  };

  return (
    <main>
      <div className=" mt:4 lg:mt-12 px-6 py-6 lg:px-10 lg:py-9 mx-auto bg-white container rounded-xl shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-0.5">Parama ne oldu?</h1>
            <h2 className="text-xl text-gray-600">
              Paranızın döviz karşısında ne kadar eridiğini kolayca görün.
            </h2>
          </div>
          <div>
            <a
              href="https://github.com/orcuntuna/parama-ne-oldu"
              target="_blank"
            >
              <Image
                src={require("@/app/github.svg")}
                width={28}
                height={28}
                alt="Source Code on GitHub"
              />
            </a>
          </div>
        </div>
        <form className="relative" onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mt-10 flex lg:space-x-8 flex-col lg:flex-row">
            <div className="lg:flex-1">
              <label
                htmlFor="start-date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Başlangıç Tarihi
              </label>
              <Controller
                name="location"
                control={control}
                defaultValue={days[0]}
                render={({ field }) => (
                  <select
                    id="start-date"
                    {...field}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6"
                  >
                    {days.map((day) => (
                      <option key={day.id} value={day.id}>
                        {day.text}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div className="lg:flex-1 mt-4 lg:mt-0">
              <label
                htmlFor="start-money"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Başlangıç Ücreti (TL)
              </label>
              <div className="mt-2">
                <Controller
                  name="startMoney"
                  control={control}
                  rules={{ required: "Bu alan Zorunludur" }}
                  render={({ field }) => (
                    <CurrencyInput
                      {...field}
                      error={errors.startMoney}
                      type="number"
                      id="start-money"
                      placeholder="TL cinsinden miktar girin"
                    />
                  )}
                />
              </div>
            </div>
            <div className="lg:flex-1 mt-4 lg:mt-0">
              <label
                htmlFor="end-money"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bugünkü Ücret (TL)
              </label>
              <div className="mt-2">
                <Controller
                  name="endMoney"
                  control={control}
                  rules={{ required: "Bu alan Zorunludur" }}
                  render={({ field }) => (
                    <CurrencyInput
                      {...field}
                      error={errors.endMoney}
                      type="number"
                      id="end-money"
                      placeholder="TL cinsinden miktar girin"
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outlined"
              text="Sıfırla"
              onClick={clearForm}
            />
            <Button type="submit" variant="success" text="Hesapla" />
          </div>

          {currencies && (
            <div className="mt-4">
              <h2 className="text-lg font-medium">Kur Farklılıkları</h2>
              <ul
                role="list"
                className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-3 sm:gap-6 xl:grid-cols-4"
              >
                <CurrencyCard
                  currencyCode="USD"
                  currencyName="Dolar"
                  currencyOldDate={getValues("location").text}
                  currencyNewDate="Bugün"
                  oldCurrencyValue={getValues("location").currency.usd}
                  currentCurrencyValue={currencies.usd}
                />
                <CurrencyCard
                  currencyCode="EUR"
                  currencyName="Euro"
                  currencyOldDate={getValues("location").text}
                  currencyNewDate="Bugün"
                  oldCurrencyValue={getValues("location").currency.eur}
                  currentCurrencyValue={currencies.eur}
                />
                <CurrencyCard
                  currencyCode="Altın"
                  currencyName="Altın"
                  currencyOldDate={getValues("location").text}
                  currencyNewDate="Bugün"
                  oldCurrencyValue={getValues("location").currency.gold}
                  currentCurrencyValue={currencies.gold}
                />
              </ul>
            </div>
          )}

          {convertedResult && (
            <div className="mt-10">
              <div className="flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Birim Adı
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Eski (Birim)
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Yeni (Birim)
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Olması Beklenen (TL)
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Fark (Birim)
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Fark (TL)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              Dolar (USD)
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <CurrencySpan
                                value={convertedResult.oldUsd}
                                code="USD"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <CurrencySpan
                                value={convertedResult.newUsd}
                                code="USD"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <CurrencySpan
                                value={convertedResult.expectedUsdToTry}
                                code="TL"
                              />
                            </td>
                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${
                                convertedResult.differenceUsd < 0 &&
                                "text-red-600"
                              }`}
                            >
                              <CurrencySpan
                                value={convertedResult.differenceUsd}
                                code="USD"
                              />
                            </td>
                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${
                                convertedResult.differenceUsdToTry < 0 &&
                                "text-red-600"
                              }`}
                            >
                              <CurrencySpan
                                value={convertedResult.differenceUsdToTry}
                                code="TL"
                              />
                            </td>
                          </tr>

                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              Euro (EUR)
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <CurrencySpan
                                value={convertedResult.oldEur}
                                code="€"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <CurrencySpan
                                value={convertedResult.newEur}
                                code="€"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <CurrencySpan
                                value={convertedResult.expectedEurToTry}
                                code="TL"
                              />
                            </td>
                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${
                                convertedResult.differenceEur < 0 &&
                                "text-red-600"
                              }`}
                            >
                              <CurrencySpan
                                value={convertedResult.differenceEur}
                                code="€"
                              />
                            </td>
                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${
                                convertedResult.differenceEurToTry < 0 &&
                                "text-red-600"
                              }`}
                            >
                              <CurrencySpan
                                value={convertedResult.differenceEurToTry}
                                code="TL"
                              />
                            </td>
                          </tr>

                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              Altın (Gram)
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <CurrencySpan
                                value={convertedResult.oldGold}
                                code="gram"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <CurrencySpan
                                value={convertedResult.newGold}
                                code="gram"
                              />
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <CurrencySpan
                                value={convertedResult.expectedGoldToTry}
                                code="TL"
                              />
                            </td>
                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${
                                convertedResult.differenceGold < 0 &&
                                "text-red-600"
                              }`}
                            >
                              <CurrencySpan
                                value={convertedResult.differenceGold}
                                code="gram"
                              />
                            </td>
                            <td
                              className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${
                                convertedResult.differenceGoldToTry < 0 &&
                                "text-red-600"
                              }`}
                            >
                              <CurrencySpan
                                value={convertedResult.differenceGoldToTry}
                                code="TL"
                              />
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
      </div>
    </main>
  );
}
