import { dates } from '@/utils/dates'
import { DateType } from '@/utils/types'
import { FormEvent } from 'react'

type CalculationFormProps = {
  selectedDate: DateType
  oldAmount?: number
  currentAmount?: number
  onChangeDate: (dateId: number) => void
  setOldAmount: (amount: number) => void
  setCurrentAmount: (amount: number) => void
  clearForm: () => void
  onSubmitForm: (e: FormEvent) => void
}

const CalculationForm = ({
  selectedDate,
  onChangeDate,
  oldAmount,
  currentAmount,
  setOldAmount,
  setCurrentAmount,
  clearForm,
  onSubmitForm,
}: CalculationFormProps) => {
  return (
    <form onSubmit={onSubmitForm}>
      <div className="mt-10 flex lg:space-x-8 flex-col lg:flex-row">
        <div className="lg:flex-1">
          <label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
            Karşılaştırma Tarihi
          </label>
          <select
            id="start-date"
            name="location"
            value={selectedDate.id}
            onChange={(e) => onChangeDate(Number(e.target.value))}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6"
          >
            {dates.map((date) => (
              <option key={date.id} value={date.id}>
                {date.text}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:flex-1 mt-4 lg:mt-0">
          <label htmlFor="start-money" className="block text-sm font-medium leading-6 text-gray-900">
            Karşılaşma Tarihindeki Tutar (TL)
          </label>
          <div className="mt-2">
            <input
              required={true}
              value={String(oldAmount) || ''}
              onChange={(e) => setOldAmount(Number(e.target.value))}
              type="number"
              id="start-money"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="TL cinsinden miktar girin"
            />
          </div>
        </div>
        <div className="lg:flex-1 mt-4 lg:mt-0">
          <label htmlFor="end-money" className="block text-sm font-medium leading-6 text-gray-900">
            Bugünkü Tutar (TL)
          </label>
          <div className="mt-2">
            <input
              required={true}
              value={String(currentAmount) || ''}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
              type="number"
              id="end-money"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="TL cinsinden miktar girin"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={clearForm}
          className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Sıfırla
        </button>
        <button
          type="submit"
          className="flex justify-center items-center rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Hesapla
        </button>
      </div>
    </form>
  )
}

export default CalculationForm
