import time
from flask import Flask
from flask_cors import CORS
import pandas as pd
import plotly
import plotly.express as px
import plotly.graph_objects as go
import math
import json
import numpy as np

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

def draw_stem_plot(i, frequencies, intensities): 
    stem_plot = go.Scatter(
        x=[frequencies, frequencies],
        y=[0, intensities],
        mode="lines",
        line=dict(color="black"),
        name=f"stemTrace_{i}",  # Use a unique identifier (e.g., index)
        showlegend=False,
        hoverinfo="x+y",
    )  
    return stem_plot

def set_sigma(fwhm):
    sigma = fwhm / (2 * np.sqrt(2 * np.log(2)))
    return sigma

def draw_simulated_plot(frequencies, intensities, fwhm):  
    fwhm_at_max =  2 * (np.sqrt(np.log(2))) / (np.sqrt(np.pi))
    sigma = fwhm / (2 * np.sqrt(2 * np.log(2)))
    x_stop = frequencies[-1] + 1000
    x_start = 0 #frequencies[0] - 50
    x = np.linspace(x_start, int(x_stop), 10000)
    sum_y = 0
    number_peaks = len(frequencies)
    scaling_factor = fwhm / fwhm_at_max
    fx = 0
    for i in range(number_peaks):
        fx = 1 / (sigma * np.sqrt(2 * np.pi)) * np.exp(- (x - frequencies[i])**2 / (2 * sigma**2))
        sum_y += scaling_factor * fx * intensities[i]

    #simulated_plot = go.Scatter(x=frequencies, y=intensities, mode="lines", line=dict(color="black"), hoverinfo="x+y")
    simulated_plot = go.Scatter(x=x, y=sum_y, mode="lines", line=dict(color="rgb(114, 98, 130)"), name="simulated plot", hoverinfo="x+y")
    return simulated_plot

@app.route("/plot3")
def draw_plot3():
    frequencies = [10, 15, 46, 51, 54, 73, 76, 94, 100, 127, 130, 133, 160, 163]
    intensities = [20, 60, 4, 40, 26, 64, 120, 12, 60, 4, 40, 26, 64, 120]
    filename = 'Raman Spectrum'
    fwhm = float(20)
      # x=X, ymax=Y, fx=1, ca. 0.94

    fig = go.Figure(layout=go.Layout(
            title=go.layout.Title(text=filename, x=0.5),
            xaxis=dict(
                title="Frequency (1/cm)",
                showline=True,
                linewidth=1,
                linecolor="black",
                mirror=True,
                range=[0, (math.ceil((max(frequencies)+0.1) / 100)) * 100],
                dtick=100,
            ),
            yaxis=dict(
                title="Intensity",
                showline=True,
                linewidth=1,
                linecolor="black",
                mirror=True,
                range=[-40, (math.ceil((max(intensities)+0.1) / 100)) * 100],
                dtick=200,
                zeroline=True,  # Add this line
                zerolinecolor='black',  # Add this line
                zerolinewidth=1,  # Add this line
            ),
            plot_bgcolor="white",
            paper_bgcolor="white",
            showlegend=False,
            width=500,
            height=350,
        ),)

    # Create vertical lines for the stems using separate line plots
    for i, (x, y) in enumerate(zip(frequencies, intensities), start=1):
        stem_trace = draw_stem_plot(i, x, y)
        fig.add_trace(stem_trace)

    # Create the simulated trace using a method
    simulated_plot = draw_simulated_plot(frequencies=frequencies, intensities=intensities, fwhm=fwhm) #initial_fwhm, fwhm_at_max)
    fig.add_trace(simulated_plot)

    # This works but not possible to have specifid names for each stem/peak
    # for x, y in zip(x_stem, y_stem):
    # fig.add_trace(go.Scatter(x=[x, x], y=[0, y], mode='lines', line=dict(color='red'), name='stemScatter', showlegend=False))

    # Convert the plot to graphJSON
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)
    return graphJSON