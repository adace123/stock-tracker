import json
import pandas as pd
import time
import random

from flask_socketio import SocketIO, Namespace, send, emit

class StockStreamHandler(Namespace):

    def __init__(self, path):
        super().__init__(path)
        self.data = pd.read_csv('data/tesla-stock-price.csv') \
                .sort_values('date').iterrows()

    def on_connect(self):
        emit('connect', {'data': 'Connected'})

    def on_select_ticker(self, data):
        self.ticker = data['ticker']

    def get_next_row(self):
        i, row = next(self.data)
        return row.to_dict()
    
    def on_stream_start(self, data):
        while True:
            try:
                emit('data', self.get_next_row())
                time.sleep(random.randint(2, 10))
            except StopIteration:
                break
        
        emit('stream_complete')
