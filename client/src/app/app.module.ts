import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StockchartComponent } from './components/stockchart/stockchart.component';
import { StockChartCanvasComponent } from './components/stock-chart-canvas/stock-chart-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    StockchartComponent,
    StockChartCanvasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
