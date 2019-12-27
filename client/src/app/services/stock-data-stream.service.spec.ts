import { TestBed } from '@angular/core/testing';

import { StockDataStreamService } from './stock-data-stream.service';

describe('StockDataStreamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockDataStreamService = TestBed.get(StockDataStreamService);
    expect(service).toBeTruthy();
  });
});
