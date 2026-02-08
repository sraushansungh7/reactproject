import { useState, useEffect } from "react";

function useCurrency(curr) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!curr) return;

    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${curr}.json`
    )
      .then((res) => res.json())
      .then((res) => setData(res[curr]))
      .catch((err) => console.error("Currency fetch error", err));
  }, [curr]);

  return data;
}

export default useCurrency;
