import json
import pandas as pd
import time
import random

from flask_socketio import SocketIO, Namespace, send, emit

class StockStreamHandler(Namespace):

    def __init__(self, path):
        super().__init__(path)
        self.get_data()

    def get_data(self):
        ticker = getattr(self, 'ticker', 'tesla')
        self.data = pd.read_csv(f'data/{ticker}-stock-price.csv') \
                .sort_values('date').iterrows()

    def on_connect(self):
        emit('connect', {'data': 'Connected'})

    def on_select_ticker(self, data):
        self.ticker = data['ticker']

    def get_next_row(self):
        i, row = next(self.data)
        return row.to_dict()
    
    def on_stream_start(self):
        while True:
            try:
                emit('data', self.get_next_row())
                time.sleep(random.randint(2, 10))
            except StopIteration:
                self.get_data()
        
