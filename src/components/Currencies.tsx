import { CurrencyType, DateType } from '@/utils/types'

type CurrenciesProps = {
  selectedDate: DateType
  currencies: CurrencyType
}

const Currencies = ({ selectedDate, currencies }: CurrenciesProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-medium">Kur Farklılıkları</h2>
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 lg:grid-cols-3 sm:gap-6 xl:grid-cols-4">
        <li className="col-span-1 flex rounded-md shadow-sm">
          <div className="flex w-16 flex-shrink-0 items-center justify-center bg-green-600 rounded-l-md text-sm font-medium text-white">
            USD
          </div>
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
            <div className="flex-1 truncate px-4 py-2 text-sm">
              <div className="font-medium text-gray-900 hover:text-gray-600 mb-1">Amerikan Doları</div>
              <p className="text-gray-500">
                {selectedDate.text}: <span className="font-medium text-black">{selectedDate.currency.usd}</span>
              </p>
              <p className="text-gray-500">
                Bugün: <span className="font-medium text-black">{currencies.usd}</span>
              </p>
            </div>
          </div>
        </li>
        <li className="col-span-1 flex rounded-md shadow-sm">
          <div className="flex w-16 flex-shrink-0 items-center justify-center bg-blue-500 rounded-l-md text-sm font-medium text-white">
            EUR
          </div>
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
            <div className="flex-1 truncate px-4 py-2 text-sm">
              <div className="font-medium text-gray-900 hover:text-gray-600 mb-1">Euro</div>
              <p className="text-gray-500">
                {selectedDate.text}: <span className="font-medium text-black">{selectedDate.currency.eur}</span>
              </p>
              <p className="text-gray-500">
                Bugün: <span className="font-medium text-black">{currencies.eur}</span>
              </p>
            </div>
          </div>
        </li>
        <li className="col-span-1 flex rounded-md shadow-sm">
          <div className="flex w-16 flex-shrink-0 items-center justify-center bg-amber-600 rounded-l-md text-sm font-medium text-white">
            Altın
          </div>
          <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
            <div className="flex-1 truncate px-4 py-2 text-sm">
              <div className="font-medium text-gray-900 hover:text-gray-600 mb-1">Altın</div>
              <p className="text-gray-500">
                {selectedDate.text}: <span className="font-medium text-black">{selectedDate.currency.gold}</span>
              </p>
              <p className="text-gray-500">
                Bugün: <span className="font-medium text-black">{currencies.gold}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Currencies
