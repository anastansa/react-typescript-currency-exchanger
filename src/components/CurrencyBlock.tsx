import React, {FC} from 'react';

interface CurrencyProps {
  currencies: string[],
  title: string,
  value: string,
  currency: string,
  onChangeAmount?(e: React.ChangeEvent<HTMLInputElement>): void,
  onChangeCurrency(e: React.ChangeEvent<HTMLSelectElement>): void
}

const CurrencyBlock: FC<CurrencyProps> = ({currencies, currency, title, value, onChangeAmount, onChangeCurrency}) => {

  return (
    <div className="exchange__block">
      <div className="exchange__text"> {title}:</div>
      <div className="exchange__currencies">
        <select value={currency} onChange={e => onChangeCurrency(e)}>
          <option className="exchange__currencies_item"> </option>
          {currencies.map(currency =>
            <option key={currency} className="exchange__currencies_item">
              {currency}
            </option>)}
        </select>
      </div>
      <div className="exchange__content">
        <input
          type="number"
          value={value}
          onChange={onChangeAmount}
          className="exchange__input"
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default CurrencyBlock;
