import pandas as pd
import time
import random
import logging

logging.getLogger().setLevel(logging.INFO)

from flask_socketio import Namespace, emit

class StockStreamHandler(Namespace):

    def __init__(self, path):
        super().__init__(path)
        self.paused = False
        self.load_data()

    def load_data(self):
        ticker = getattr(self, 'ticker', 'tesla')
        stock_data = pd.read_csv(f'data/{ticker}-stock-price.csv')
        stock_data['date'] = pd.to_datetime(stock_data['date']).astype(str)
        self.data = stock_data.drop_duplicates() \
                        .sort_values('date').iterrows()

    def on_connect(self):
        emit('connect', {'data': 'Connected'})

    def on_select_ticker(self, data):
        self.ticker = data['ticker']

    def on_toggle_stream(self, state: bool):
        self.paused = state
        if not self.paused:
            self.on_stream_start()

    def on_reset_stream(self):
        self.load_data()
        self.on_stream_start()

    def get_next_row(self):
        _, row = next(self.data)
        return row.to_dict()
    
    def on_stream_start(self):
        while not self.paused:
            try:
                emit('data', self.get_next_row())
                time.sleep(random.randint(1, 2))
            except StopIteration:
                break
