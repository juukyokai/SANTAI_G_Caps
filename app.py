from flask import Flask, app
from flask import render_template
app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')