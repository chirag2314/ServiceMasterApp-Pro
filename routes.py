from functools import wraps
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, session
import os

from models import db, User, Service, ServiceRequest

from app import app

@app.route('/')
def index():
    return render_template('index.html')