import { useEffect, useState } from 'react';
import { getStockPrices } from '../connectors/stockMarketConnector';
import { getStoredSymbols, addSymbol as storeSymbol, setStoredSymbols } from '../connectors/localStorageManager';
import { StockList } from '@/components/StockList/StockList';

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
    if (!newStockSymbol || newStockSymbol in stockPrices) return;
    storeSymbol(newStockSymbol);
    setSymbol("");
    setListLoading(true);
    setListError("");

    try {
      const stockPrice = await getStockPrices([newStockSymbol]);
      setStockPrices(prev => ({ ...prev, ...stockPrice }));
    } catch {
      setListError("Error fetching stock price for " + newStockSymbol);
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
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow text-center">
      <h2 className="text-2xl font-bold mb-6">Stock Price Checker</h2>
      <h3 className="text-xl font-semibold mb-4">My Stock List</h3>
      <div className="flex items-center justify-center gap-2 mb-4">
        <input
          type="text"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="Add stock symbol (e.g. MSFT)"
          className="border border-gray-300 rounded px-3 py-2 text-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleAddStock}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
          disabled={!symbol.trim() || (symbol.trim().toUpperCase() in stockPrices)}
        >
          Add
        </button>
      </div>
      {listError && <div className="text-red-600 mb-2">{listError}</div>}
      {Object.keys(stockPrices).length > 0 && (
        <StockList
          stockPrices={stockPrices}
          listLoading={listLoading}
          onRemove={handleRemoveFromList}
        />
      )}
    </div>
  );
}

export default App;
