export interface StockRecord {
    date: string;
    close: number;
    volume: number;
    open: number;
    high: number;
    low: number;
}

export interface StockEntity {
    ticker: string;
    stocks: Array<StockRecord>;
}

export type StockRecordResponse = StockRecord | null | undefined | {};
