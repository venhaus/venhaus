async function getStockPrice(symbol: string): Promise<number | null> {
  const apiKey = "d219ns1r01qkdupifgo0d219ns1r01qkdupifgog";
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // The current price is in the 'c' field
    return typeof data.c === 'number' ? data.c : null;
  } catch (error) {
    console.error(`Error fetching ${symbol} stock price:`, error);
    return null;
  }
}

export async function getStockPrices(symbols: string[]): Promise<Record<string, number | null>> {
  const results: Record<string, number | null> = {};
  await Promise.all(symbols.map(async (symbol) => {
    results[symbol] = await getStockPrice(symbol);
  }));
  return results;
}
