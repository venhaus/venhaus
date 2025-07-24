import { useEffect, useState } from 'react';
import { getStockPrice } from './stockMarketConnector'

function App() {
  const [stockPrice, setStockPrice] = useState<number | null>(null);

  useEffect(() => {
    getStockPrice().then(setStockPrice);
  }, []);

  return (
    <div>Apple: {stockPrice}</div>
  )
}

export default App
