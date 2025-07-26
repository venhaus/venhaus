import { useEffect, useState } from 'react';
import { getStockPrices } from '../connectors/stockMarketConnector';
import { getStoredSymbols, addSymbol as storeSymbol, setStoredSymbols } from '../connectors/localStorageManager';
import { StockList } from '../components/StockList/StockList';
import {Button, TextInput} from '@mantine/core'

export function App() {
  const [symbol, setSymbol] = useState<string>("");
  const [stockPrices, setStockPrices] = useState<Record<string, number | null>>({});
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [listError, setListError] = useState<string>("");

  useEffect(() => {
    const storedSymbols = getStoredSymbols();
    if (storedSymbols.length > 0) {
      setListLoading(true);
      setListError("");
      getStockPrices(storedSymbols)
        .then(prices => setStockPrices(prices))
        .catch(() => setListError("Error fetching stock prices."))
        .finally(() => setListLoading(false));
    } else {
      setStockPrices({});
    }
  }, []);

  const handleAddStock = async () => {
    const newStockSymbol = symbol.trim().toUpperCase();
    if (!newStockSymbol || newStockSymbol in stockPrices) {return;}
    storeSymbol(newStockSymbol);
    setSymbol("");
    setListLoading(true);
    setListError("");

    try {
      const stockPrice = await getStockPrices([newStockSymbol]);
      setStockPrices(prev => ({ ...prev, ...stockPrice }));
    } catch {
      setListError(`Error fetching stock price for ${  newStockSymbol}`);
    } finally {
      setListLoading(false);
    }
  };

  const handleRemoveFromList = (symbol: string) => {
    const updatedSymbolList = Object.keys(stockPrices).filter(s => s !== symbol);
    setStoredSymbols(updatedSymbolList);
    setStockPrices(prev => {
      const copy = { ...prev };
      delete copy[symbol];
      return copy;
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-xl mx-auto my-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 dark:text-gray-100">
        <h1 className='text-4xl mb-4'>Watchlist</h1>
        <div className='flex gap-2 mb-8'>
          <TextInput
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
            placeholder='Add stock symbol (e.g. MSFT)'
            className='w-sm dark:bg-gray-800'
            classNames={{
              input: 'dark:bg-gray-800'
            }}
          />
          <Button
            onClick={handleAddStock}
            disabled={!symbol.trim() || (symbol.trim().toUpperCase() in stockPrices)}>
            Add
          </Button>
        </div>
        {listError && <div className="text-red-600 dark:text-red-400">{listError}</div>}
        {getStoredSymbols().length > 0 && (
          <StockList
            stockPrices={stockPrices}
            listLoading={listLoading}
            onRemove={handleRemoveFromList}
          />
        )}
      </div>
    </div>
  );
}

export default App;
