from flask import Flask
from flask_cors import CORS
from extensions import db, security, cache
import routes
import createinitialdata
from dotenv import load_dotenv
import os
import resources
from worker import celery_init_app
import flask_excel as excel
from tasks import daily_reminder, monthly_email
from celery.schedules import crontab

load_dotenv()


celery_app = None

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI']=os.getenv('SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_DATABASE_TRACK']=os.getenv('SQLALCHEMY_DATABASE_TRACK')
    app.config['SECRET_KEY']=os.getenv('SECRET_KEY')
    app.config['SECURITY_PASSWORD_SALT']=os.getenv('SECURITY_PASSWORD_SALT')

    app.config['SECURITY_TOKEN_AUTHENTICATION_HEADER'] = 'Authentication-Token'
    app.config['SECURITY_TOKEN_MAX_AGE'] = 600 #In seconds
    app.config['SECURITY_TOKEN_WITHOUT_CONFIRMATION']= True

    app.config['CACHE_TYPE'] = 'RedisCache'
    app.config['CACHE_DEFAULT_TIMEOUT'] = 300 # in milliseconds
    app.config['DEBUG'] = True
    app.config['CACHE_REDIS_PORT'] = 6379 # default port, taken from documentation
    
    cache.init_app(app)
    db.init_app(app)


    with app.app_context():
        from models import User, Role
        from flask_security import SQLAlchemyUserDatastore

        user_datastore = SQLAlchemyUserDatastore(db, User, Role)
        security.init_app(app, user_datastore)
        
        db.create_all()
        createinitialdata.create_data(user_datastore)


    app.config['WTF_CSRF_CHECK_DEFAULT'] = False
    app.config['SECURITY_CSRF_PROTECT_MECHANISHMS'] = []
    app.config['SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS'] = True

    routes.create_views(app,user_datastore, db, cache)
    resources.api.init_app(app)

    return app

app = create_app()
excel.init_excel(app)
celery_app=celery_init_app(app)

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
        20,
        #crontab(hour=9), #9AM everyday
        daily_reminder.s()
    )
    sender.add_periodic_task(
        20,
        #crontab(day_of_month=1),
        monthly_email.s()
    )
# commenting to resolve commit errors
