import time
from flask import Flask
from flask_cors import CORS
import pandas as pd
import plotly
import plotly.express as px


app = Flask(__name__)
CORS(app)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/plot1')
def draw_plot1():
    df = pd.DataFrame({
        "Fruit": ["Apples", "Oranges", "Bananas", "Apples", "Oranges", "Bananas"],
        "Amount": [4, 1, 2, 2, 4, 5],
        "City": ["SF", "SF", "SF", "Montreal", "Montreal", "Montreal"]
    })
    fig = px.bar(df, x="Fruit", y="Amount", color="City", barmode="group")
    graphJSON = plotly.io.to_json(fig, pretty=True)
    return graphJSON

@app.route('/plot2')
def draw_plot2():
    graphJSON={
        "data": [
                {
                "x": [1, 2, 3],
                "y": [2, 6, 3],
                "type": "scatter",
                "mode": "lines+markers",
                "marker": {
                    "color": "red"
                }
                },
                {
                "type": "bar", 
                "x": [1, 2, 3], 
                "y": [2, 5, 3]
            }
        ],
        "layout": {
            "title": "A Fancy Plot"
        } 
    }
    return graphJSON

