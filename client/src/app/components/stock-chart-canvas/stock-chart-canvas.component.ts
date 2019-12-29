import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { StockRecord } from '../../models/stock';

@Component({
  selector: 'app-stock-chart-canvas',
  templateUrl: './stock-chart-canvas.component.html',
  styleUrls: ['./stock-chart-canvas.component.scss']
})
export class StockChartCanvasComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('stockCanvas', {static: false}) canvas: ElementRef;
  @Input() ticker: string;
  @Input() stocks: StockRecord[] = [];
  stockChart: Chart;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const ctx = this.canvas.nativeElement;
    this.stockChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: this.ticker,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            data: [1, -7, 15, 9, 19, 5, 10],
            pointBackgroundColor: 'green',
            pointRadius: 5
        }]
      },
      options: {
        responsive: false,
        scales: {
        }
      }
    });
  }

  ngOnChanges(changes) {
    const currStocks: StockRecord[] | undefined = changes.stocks.currentValue;
    if (currStocks && currStocks.length) {
      // this.stockChart.data.datasets[0].data.push(currStocks[currStocks.length - 1].close);
      // console.log(this.stockChart.data.datasets[0].data);
      // this.stockChart.update();
    }
  }

}
