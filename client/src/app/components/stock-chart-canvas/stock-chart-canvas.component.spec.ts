import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockChartCanvasComponent } from './stock-chart-canvas.component';

describe('StockChartCanvasComponent', () => {
  let component: StockChartCanvasComponent;
  let fixture: ComponentFixture<StockChartCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockChartCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockChartCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
