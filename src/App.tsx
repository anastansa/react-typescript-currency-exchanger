import React from 'react';
import axios from "axios";
import exchangeImg from './img/exchange.svg'
import CurrencyBlock from "./components/CurrencyBlock";

function App() {
  const [currencies, setCurrencies] = React.useState<string[]>([])
  const [rate, setRate] =  React.useState<number>(0)

  const [fromCurrency, setFromCurrency] = React.useState<string>('')
  const [toCurrency, setToCurrency] = React.useState<string>('')
  const [fromAmount, setFromAmount] = React.useState<string>('')
  // const [toAmount, setToAmount] = React.useState<number>(0)

  React.useEffect(() => {
    fetchRates()
    exchange()
  }, [])

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value)
    console.log(fromAmount)
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
    <div className="container">
      <div className="exchange__title"> Currency Exchanger </div>
      <div className="exchange">
        <img className="exchange__img" src={exchangeImg} alt="exchange"/>
        <CurrencyBlock
          currencies={currencies}
          value={fromAmount}
          title={"From"}
          onChangeValue={onChangeValue}
        />
        <CurrencyBlock
          currencies={currencies}
          value={fromAmount}
          title={"To"}
          onChangeValue={onChangeValue}
        />
      </div>
    </div>
  );
}

export default App;
