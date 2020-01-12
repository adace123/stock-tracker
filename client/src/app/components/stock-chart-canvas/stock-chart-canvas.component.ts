import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input, SimpleChanges, ElementRef } from '@angular/core';
import { Chart, ChartTooltipItem } from 'chart.js';
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
  private stockChart: Chart;
  private toolTipLabels: string[] = ['close', 'open', 'high', 'low', 'volume'];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const ctx: HTMLCanvasElement = this.canvas.nativeElement;
    this.stockChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
            label: this.ticker,
            fill: false,
            lineTension: 0.1,
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            pointBackgroundColor: 'pink',
            pointRadius: 4
        }]
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Date'
              },
              type: 'time',
              distribution: 'series'
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Closing Price (USD)'
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, _) => {
              const selectedStock = this.stocks[tooltipItem.index];
              return this.toolTipLabels.map(label => `${label}: ${selectedStock[label]}`);
            }
          }
        }
      }
    });
  }

  private updateStockChart(currStocks: StockRecord[] | undefined) {
    if (currStocks && currStocks.length) {
      const latestStock = currStocks[currStocks.length - 1];
      const labels = this.stockChart.data.labels;

      if (labels[labels.length - 1] !== latestStock.date) {
        this.stockChart.data.labels.push(latestStock.date);
      }

      this.stockChart.data.datasets[0].data.push(currStocks[currStocks.length - 1].close);
      this.stockChart.update();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName of Object.keys(changes)) {
      switch (propName) {
        case 'stocks':
          this.updateStockChart(changes[propName].currentValue);
      }
    }
  }

}
