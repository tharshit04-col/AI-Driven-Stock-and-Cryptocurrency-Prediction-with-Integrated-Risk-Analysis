from data_fetcher import fetch_data
from predictor import predict_price
from risk import calculate_risk

def analyze_asset(symbol):
    data = fetch_data(symbol)

    prediction = predict_price(symbol)
    risk = calculate_risk(data)

    return {
        "symbol": symbol,
        **prediction,
        **risk
    }
