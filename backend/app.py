from flask import Flask, jsonify, send_file
import pandas as pd
import glob
import os
from datetime import datetime

app = Flask(__name__)

# Utility to get latest batch file
def latest_file(pattern):
    files = glob.glob(pattern)
    if not files:
        return None
    return max(files, key=os.path.getctime)

@app.route('/api/accepted')
def get_accepted():
    f = latest_file('Accepted_*.xlsx')
    if not f:
        return jsonify([])
    df = pd.read_excel(f)
    return df.to_json(orient='records')

@app.route('/api/rejected')
def get_rejected():
    f = latest_file('Rejected_*.xlsx')
    if not f:
        return jsonify([])
    df = pd.read_excel(f)
    return df.to_json(orient='records')

@app.route('/api/summary')
def get_summary():
    f = latest_file('Summary_*.txt')
    if not f:
        return jsonify({})
    with open(f, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    summary = {}
    for line in lines:
        if ':' in line:
            k, v = line.split(':', 1)
            summary[k.strip()] = v.strip()
    return jsonify(summary)

@app.route('/api/run-extraction', methods=['POST'])
def run_extraction():
    os.system('python news_scraper.py')
    return jsonify({'status': 'Extraction complete'})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
