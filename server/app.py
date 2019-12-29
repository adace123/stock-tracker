#!/usr/bin/env python3 
from flask import Flask, Response, jsonify, stream_with_context
from flask_socketio import SocketIO, emit
from stream_handler import StockStreamHandler

app = Flask(__name__)
app.debug = True

socketio = SocketIO(app, cors_allowed_origins='*')

socketio.on_namespace(StockStreamHandler('/'))

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)
