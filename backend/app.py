from flask import Flask
from flask_socketio import SocketIO
import time
import threading
import random

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

prices = {
    "AAPL": 190,
    "MSFT": 410,
    "BTC-USD": 43000,
    "ETH-USD": 2300
}

def stream_market(symbols):
    while True:
        results = []
        for s in symbols:
            prices[s] += random.uniform(-1, 1)
            results.append({
                "symbol": s,
                "current_price": round(prices[s], 2),
                "predicted_price": round(prices[s] + random.uniform(1, 3), 2),
                "trend": "Bullish",
                "risk_level": "Medium"
            })

        socketio.emit("market_update", results)
        time.sleep(2)

@socketio.on("start_stream")
def start_stream(data):
    symbols = data["symbols"]
    threading.Thread(
        target=stream_market,
        args=(symbols,),
        daemon=True
    ).start()

if __name__ == "__main__":
    socketio.run(app, port=5000, debug=True)
