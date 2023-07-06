import axios from "axios";

export const convertCurrencyToNumber = (currencyString: string): number => {
  const decimalSeparator = ',';
  const thousandSeparator = '.';
  const temporaryChar = '|';
  const replacedCommaString = currencyString.replace(decimalSeparator, temporaryChar);
  const cleanString = replacedCommaString.replace(new RegExp('\\' + thousandSeparator, 'g'), '');
  return parseFloat(cleanString.replace(temporaryChar, '.'));
}


export const getCurrentCurrencies = async () => {
  const response = await axios.get('https://finans.truncgil.com/v3/today.json')

  const usdCurrency = response.data.USD.Buying
  const eurCurrency = response.data.EUR.Buying
  const goldCurrency = response.data["gram-altin"].Buying

  return {
    usd: convertCurrencyToNumber(usdCurrency),
    eur: convertCurrencyToNumber(eurCurrency),
    gold: convertCurrencyToNumber(goldCurrency)
  }
}
