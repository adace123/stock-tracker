import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { StockRecord } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockDataStreamService {
  private readonly socketUrl = 'http://localhost:5000';
  private socket: any;

  constructor() { }

  select(stockTicker: string = 'tesla'): this {
    this.socket = io(this.socketUrl);

    this.socket.on('connect', () => {
      this.socket.emit('select_ticker', {ticker: stockTicker});
    });

    return this;
  }

  stream(): Observable<StockRecord> {
    if (!this.socket) {
      throw new Error('Not connected to data server');
    }

    this.socket.emit('stream_start');
    const dataStream: Observable<StockRecord> = new Observable(observer => {
      this.socket.on('data', (data: StockRecord) => observer.next(data));
    });
    return dataStream;
  }

}
