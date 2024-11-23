from dotenv import load_dotenv
import os
load_dotenv()
from app import app

app.config['SQLALCHEMY_DATABASE_URI']=os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_DATABASE_TRACK']=os.getenv('SQLALCHEMY_DATABASE_TRACK')
app.config['SECRET_KEY']=os.getenv('SECRET_KEY')
app.config['SECURITY_PASSWORD_SALT']=os.getenv('SECURITY_PASSWORD_SALT')
app.config['WTF_CSRF_CHECK_DEFAULT'] = False
app.config['SECURITY_CSRF_PROTECT_MECHANISHMS'] = []
app.config['SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS'] = True