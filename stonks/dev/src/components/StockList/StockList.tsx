import React from "react";
import { CloseButton, Grid, Skeleton, Tooltip } from '@mantine/core';

export type StockListProps = {
  stockPrices: Record<string, number | null>;
  listLoading: boolean;
  onRemove: (symbol: string) => void;
};

const symbolCols = 4;
const priceCols = 7;
const removeCols = 1;

export function StockList({ stockPrices, listLoading, onRemove }: StockListProps) {
  return (
    <Grid align="center">
      <Grid.Col span={symbolCols}><span style={{fontWeight: 'bold'}}>Stock symbol</span></Grid.Col>
      <Grid.Col span={priceCols}><span style={{fontWeight: 'bold'}}>Price</span></Grid.Col>
      <Grid.Col span={removeCols}/>
      { listLoading ? <>
      <SkeletonCols />
      <SkeletonCols />
      <SkeletonCols />
      <SkeletonCols />
      </> : Object.keys(stockPrices).sort().map(symbol => (
        <React.Fragment key={symbol}>
          <Grid.Col span={symbolCols}>{symbol}</Grid.Col>
          <Grid.Col span={priceCols}>
            {stockPrices[symbol] != null ? `$ ${stockPrices[symbol]!.toFixed(2)}` :  <Skeleton height={8} />}
          </Grid.Col>
          <Grid.Col span={removeCols}>
            <Tooltip label='Remove'>
            <CloseButton
              onClick={() => onRemove(symbol)}
             />
             </Tooltip>
          </Grid.Col>
        </React.Fragment>
      ))}
      </Grid>
  );
}

function SkeletonCols() {
  return (
    <>
      <Grid.Col span={symbolCols} style={{lineHeight: 'normal'}}>
        <Skeleton height={8} />
      </Grid.Col>
      <Grid.Col span={priceCols} style={{lineHeight: 'normal'}}>
        <Skeleton height={8} />
      </Grid.Col>
      <Grid.Col span={removeCols} style={{lineHeight: 'normal'}}>
        <Skeleton height={8} />
      </Grid.Col>
    </>
)
}