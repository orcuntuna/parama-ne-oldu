import {ConvertedResult} from "@/utils/types";

type ResultsTableProps = {
  results: ConvertedResult
}

const ResultsTable = ({results}: ResultsTableProps) => {
  return (
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
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(results.oldUsd)} $
                  </td>
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(results.newUsd)} $
                  </td>
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(results.expectedUsdToTry)} TL
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${results.differenceUsd < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(results.differenceUsd)} $
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${results.differenceUsdToTry < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(results.differenceUsdToTry)} TL
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Euro
                    (EUR)
                  </td>
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(results.oldEur)} €
                  </td>
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(results.newEur)} €
                  </td>
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(results.expectedEurToTry)} TL
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${results.differenceEur < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(results.differenceEur)} €
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${results.differenceEurToTry < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(results.differenceEurToTry)} TL
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Altın
                    (Gram)
                  </td>
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(results.oldGold)} gram
                  </td>
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(results.newGold)} gram
                  </td>
                  <td
                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Intl.NumberFormat().format(results.expectedGoldToTry)} TL
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${results.differenceGold < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(results.differenceGold)} gram
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-green-600 font-medium ${results.differenceGoldToTry < 0 && 'text-red-600'}`}>{new Intl.NumberFormat().format(results.differenceGoldToTry)} TL
                  </td>
                </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsTable
