import React, {FC} from 'react';

interface CurrencyProps {
  currencies: string[],
  title: string,
  value: string,
  onChangeValue(e: React.ChangeEvent<HTMLInputElement>): void
}

const CurrencyBlock: FC<CurrencyProps> = ({currencies, title, value, onChangeValue}) => {

  return (
    <div className="exchange__block">
      <div className="exchange__text"> {title}: </div>
      <select className="exchange__currencies">
        <option className="exchange__currencies_item"> </option>
        {currencies.map(currency =>
          <option key={currency} className="exchange__currencies_item">
            {currency}
          </option>)}
      </select>
      <div className="exchange__content">
        <input
          type="number"
          value={value}
          onChange={e => onChangeValue(e)}
          className="exchange__input"
        />
      </div>
    </div>
  );
};

export default CurrencyBlock;
