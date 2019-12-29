import { Component, OnInit } from '@angular/core';
import { StockDataStreamService } from '../../services/stock-data-stream.service';
import { filter, distinct, map } from 'rxjs/operators';
import { StockRecord, StockRecordResponse } from '../../models/stock';

@Component({
  selector: 'app-stockchart',
  templateUrl: './stockchart.component.html',
  styleUrls: ['./stockchart.component.scss']
})
export class StockchartComponent implements OnInit {
  stocks: StockRecord[] = [];
  ticker = 'Tesla';

  constructor(private stockService: StockDataStreamService) { }

  ngOnInit() {
    this.stockService.select('tesla').stream()
      .pipe(
        filter((value: StockRecordResponse) => Boolean(value) && typeof(value) === 'object'),
        map((value: StockRecord) => ({...value, date: new Date(value.date)})),
        distinct()
      )
      .subscribe(
        (data: StockRecord) => {
          this.stocks = [...this.stocks, data];
        },
        (err: any) => console.log(`Encountered error ${err}`)
      );
  }

}
