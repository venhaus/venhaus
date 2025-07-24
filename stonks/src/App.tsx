import { useState } from 'react';
import { getStockPrice } from './stockMarketConnector'

function App() {
  const [stockPrice, setStockPrice] = useState<number | null>(null);
  const [symbol, setSymbol] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFetchPrice = async () => {
    setLoading(true);
    setError("");
    setStockPrice(null);
    try {
      const price = await getStockPrice(symbol.trim().toUpperCase());
      if (price === null) {
        setError("Could not fetch price. Check the symbol and try again.");
      }
      setStockPrice(price);
    } catch {
      setError("Error fetching stock price.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow text-center">
      <h2 className="text-2xl font-bold mb-6">Stock Price Checker</h2>
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g. AAPL)"
          className="border border-gray-300 rounded px-3 py-2 text-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleFetchPrice}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
          disabled={loading || !symbol.trim()}
        >
          {loading ? 'Loading...' : 'Confirm'}
        </button>
      </div>
      {error || stockPrice !== null &&
      <div className="mt-4">
        {error && <span className="text-red-600">{error}</span>}
        {stockPrice !== null && !error && (
          <span className="font-medium">Current price for <b>{symbol.trim().toUpperCase()}</b>: ${stockPrice}</span>
        )}
      </div>}
    </div>
  )
}

export default App
