import React, { useState } from "react";
import InputBox from "../Currency/Componets/InputBox";
import useCurrency from "../Currency/Cuustomehook/useCurrency";

export default function CurreChage() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("inr");
  const [to, setTo] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrency(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (!currencyInfo[to]) return;
    const result = amount * currencyInfo[to];
       setConvertedAmount(Number(result.toFixed(2)));
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full max-w-md bg-white p-5 rounded-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            selectCurrency={from}
            onCurrencyChange={setFrom}
            onAmountChange={setAmount}
            

          />

          <div className="text-center my-3">
            <button
              type="button"
              onClick={swap}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            selectCurrency={to}
            onCurrencyChange={setTo}
            amountDisable
          />

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}
