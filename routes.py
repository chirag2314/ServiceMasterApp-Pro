from functools import wraps
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, session
import os

from models import db, Customer, Professional, Service, ServiceRequest

from app import app

type='C'

def auth_required(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please Login')
            return redirect(url_for('login'))
        return func(*args, **kwargs)
    return inner

def admin_required(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please Login')
            return redirect(url_for('login'))
        cuser=Customer.query.get(session['user_id'])
        if type != 'C':
            flash('Unauthorzied Access')
            return redirect(url_for('login'))
        else:
            if not cuser.is_admin:
                flash('Unauthorzied Access')
                return redirect(url_for('login'))
            else:
               return func(*args, **kwargs) 
    return inner

def prof_required(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please Login')
            return redirect(url_for('login'))
        puser=Professional.query.get(session['user_id'])
        if type != 'P':
            flash('Unauthorzied Access')
            return redirect(url_for('login'))
        else:
            return func(*args, **kwargs) 
    return inner

def cust_required(func):
    @wraps(func)
    def inner(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please Login')
            return redirect(url_for('login'))
        cuser=Customer.query.get(session['user_id'])
        if type != 'C':
            flash('Unauthorzied Access')
            return redirect(url_for('login'))
        else:
            if cuser.is_admin:
                flash('Unauthorzied Access')
                return redirect(url_for('login'))
            else:
               return func(*args, **kwargs) 
    return inner

@app.route('/')
def index():
    return render_template('index.html')