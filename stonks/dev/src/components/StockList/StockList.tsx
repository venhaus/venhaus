import React from "react";

export type StockListProps = {
  stockPrices: Record<string, number | null>;
  listLoading: boolean;
  onRemove: (symbol: string) => void;
};

export function StockList({ stockPrices, listLoading, onRemove }: StockListProps) {
  return (
    <div className="mt-2 grid grid-cols-3 gap-x-2 text-left">
      <div className="font-semibold text-gray-700 bg-gray-100 rounded-t px-2 py-2">Stock symbol</div>
      <div className="font-semibold text-gray-700 bg-gray-100 rounded-t px-2 py-2">Price</div>
      <div className="bg-gray-100 rounded-t px-2 py-2"><span className="sr-only">Remove</span></div>
      {Object.keys(stockPrices).sort().map(symbol => (
        <React.Fragment key={symbol}>
          <div className="font-mono flex items-center px-2 py-2">{symbol}</div>
          <div className="flex items-center px-2 py-2">
            {listLoading ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              stockPrices[symbol] != null ? (
                <span className="font-medium">${stockPrices[symbol]!.toFixed(2)}</span>
              ) : null
            )}
          </div>
          <div className="flex items-center px-2 py-2">
            <button
              onClick={() => onRemove(symbol)}
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              title="Remove"
            >
              Remove
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}