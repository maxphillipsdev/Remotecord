from flask import render_template, request
from remotecord import app


@app.route('/dash/<token>')
def dashboard(token: str):
    return render_template('dashboard.html')                server_url=request)
