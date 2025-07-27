import { useEffect, useState } from 'react';
import { getStockPrice, getStockPrices } from '../connectors/stockMarketConnector';
import { getStoredSymbols, addSymbol as storeSymbol, setStoredSymbols } from '../connectors/localStorageManager';
import { StockList } from '../components/StockList/StockList';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAlert } from '../hooks/useAlert';
import { Alert } from '../components/Alert/Alert';

export function App() {
  const [stockPrices, setStockPrices] = useState<Record<string, number | null>>({});
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [listError, setListError] = useState<string>("");

  const { alertVisible, message, showAlert, hideAlert } = useAlert();

  const form = useForm({
    initialValues: { symbol: "" },
    validate: {
      symbol: (value) => {
        const trimmed = value.trim().toUpperCase();
        if (!trimmed) { return 'Enter a stock symbol'; }
        if (trimmed in stockPrices) { return 'Already in list'; }
        return null;
      },
    },
  });

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

  const handleAddStock = async (values: { symbol: string }) => {
    const newStockSymbol = values.symbol.trim().toUpperCase();
    if (!newStockSymbol || newStockSymbol in stockPrices) { return; }
    
    hideAlert();
    form.reset();
    setListLoading(true);
    setListError("");

    try {
      const price = await getStockPrice(newStockSymbol);
      
      if (price === null) {
        showAlert(`The symbol "${newStockSymbol}" was not found. Please check the spelling and try again.`);
      } else {
        storeSymbol(newStockSymbol);
        setStockPrices(prev => ({ ...prev, [newStockSymbol]: price }));
      }
    } catch {
      setListError(`Error fetching stock price for ${newStockSymbol}`);
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
      <div className="w-full max-w-xl mx-auto my-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 dark:text-gray-100 relative">
        <h1 className='text-4xl mb-4'>Watchlist</h1>
        <form
          className='flex gap-2 mb-8'
          onSubmit={form.onSubmit(handleAddStock)}
        >
          <TextInput
            {...form.getInputProps('symbol')}
            placeholder='Add stock symbol (e.g. MSFT)'
            className='w-sm dark:bg-gray-800'
            classNames={{
              input: 'dark:bg-gray-800'
            }}
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={
              !form.values.symbol.trim() ||
              !!form.errors.symbol ||
              (form.values.symbol.trim().toUpperCase() in stockPrices)
            }
          >
            Add
          </Button>
        </form>
        {listError && <div className="text-red-600 dark:text-red-400">{listError}</div>}
        <Alert
          message={message}
          alertVisible={alertVisible}
          onClose={hideAlert}
          title="Symbol not found"
          color="yellow"
        />
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
