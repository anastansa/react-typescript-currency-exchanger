import React from 'react';
import axios from "axios";
import exchangeImg from './img/exchange.svg'
import CurrencyBlock from "./components/CurrencyBlock";

function App() {
  const [currencies, setCurrencies] = React.useState<string[]>([])
  const [rate, setRate] =  React.useState<number>(0)

  const [fromCurrency, setFromCurrency] = React.useState<string>('USD')
  const [toCurrency, setToCurrency] = React.useState<string>('RUB')
  const [fromAmount, setFromAmount] = React.useState<number>(0)
  const [toAmount, setToAmount] = React.useState<number>(0)

  React.useEffect(() => {
    fetchRates()
    if(fromCurrency == toCurrency) {
      setRate(1)
      setToAmount(fromAmount)
    }
    exchange().then(() => setToAmount(fromAmount * rate))
  }, [fromCurrency, toCurrency, fromAmount, toAmount, rate])

  const changeFromAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(+e.target.value)
    setToAmount(+e.target.value * rate)
  }

  const changeToAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToAmount(+e.target.value)
    setFromAmount(+e.target.value / rate)
  }

  const changeFromCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value)
  }

  const changeToCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value)
  }

  async function fetchRates() {
    try {
      const response = await axios.get('https://currency-exchange.p.rapidapi.com/listquotes', {
        headers: {
          'X-RapidAPI-Key': 'ad91647054mshd3e7ae435ce692bp160968jsnc05e7e4d2aa4',
          'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
      })
      setCurrencies(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  async function exchange() {
    try {
      const response = await axios.get('https://currency-exchange.p.rapidapi.com/exchange', {
        params: {from: fromCurrency, to: toCurrency, q: 1.0},
        headers: {
          'X-RapidAPI-Key': 'ad91647054mshd3e7ae435ce692bp160968jsnc05e7e4d2aa4',
          'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
      })
      setRate(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div id="exchange-page">
      <div className="container">
        <div className="exchange__title"> Currency Exchanger</div>
        <div className="exchange">
          <img className="exchange__img" src={exchangeImg} alt="exchange"/>
          <CurrencyBlock
            currencies={currencies}
            value={fromAmount.toString()}
            currency={fromCurrency}
            title={"From"}
            onChangeAmount={changeFromAmount}
            onChangeCurrency={changeFromCurrency}
          />
          <CurrencyBlock
            currencies={currencies}
            value={toAmount.toString()}
            currency={toCurrency}
            title={"To"}
            onChangeAmount={changeToAmount}
            onChangeCurrency={changeToCurrency}
          />
        </div>
        <div className="exchange__comment"> 1 {fromCurrency} = {rate} {toCurrency} </div>
      </div>
    </div>
  );
}

export default App;
