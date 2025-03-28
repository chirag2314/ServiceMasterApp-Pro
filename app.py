from flask import Flask
from flask_cors import CORS
from extensions import db, security
import routes
import createinitialdata
from dotenv import load_dotenv
import os
import resources
load_dotenv()



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

    routes.create_views(app,user_datastore, db)
    resources.api.init_app(app)

    return app

app = create_app()