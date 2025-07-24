const STORAGE_KEY = 'stockSymbols';

export function getStoredSymbols(): string[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function setStoredSymbols(symbols: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(symbols));
}

export function addSymbol(symbol: string): void {
  const symbols = getStoredSymbols();
  if (!symbols.includes(symbol)) {
    symbols.push(symbol);
    setStoredSymbols(symbols);
  }
}

export function removeSymbol(symbol: string): void {
  const symbols = getStoredSymbols().filter(s => s !== symbol);
  setStoredSymbols(symbols);
} 