import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { StockDataStreamService } from '../../services/stock-data-stream.service';
import { StockRecord, StockRecordResponse } from '../../models/stock';
import { filter, distinct, map } from 'rxjs/operators';

@Component({
  selector: 'app-stockchart',
  templateUrl: './stockchart.component.html',
  styleUrls: ['./stockchart.component.scss']
})
export class StockchartComponent implements AfterViewInit, OnInit {
  @ViewChild('stockCanvas', {static: false}) canvas: ElementRef;
  stockChart: Chart;
  ticker: string;
  stocks: StockRecord[] = [];

  constructor(private stockService: StockDataStreamService) { }

  ngOnInit() {
    this.stockService.select('tesla').stream()
      .pipe(
        filter((value: StockRecordResponse) => Boolean(value) && typeof(value) === 'object'),
        map((value: StockRecord) => ({...value, date: new Date(value.date)})),
        distinct()
      )
      .subscribe(
        (data: StockRecord) => console.log(data),
        (err: any) => console.log(`Encountered error ${err}`)
      );
  }

  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement;
    this.stockChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
      },
      options: {}
    });
  }

}
