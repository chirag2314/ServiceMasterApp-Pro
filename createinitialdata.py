from flask_security import SQLAlchemySessionUserDatastore
from extensions import db
from flask_security.utils import hash_password


def create_data(user_datastore : SQLAlchemySessionUserDatastore):

    user_datastore.find_or_create_role(name='admin', description="Administrator")
    user_datastore.find_or_create_role(name='customer', description='Customer')
    user_datastore.find_or_create_role(name='professional', description='Professional')

    if not user_datastore.find_user(email = "admin@servicemaster.com"):
        user_datastore.create_user(email = "admin@servicemaster.com", password=hash_password('admin'), roles=['admin'], name='Admin')
    if not user_datastore.find_user(email = "firstuser@servicemaster.com"):
        user_datastore.create_user(email = "firstuser@servicemaster.com", password=hash_password('firstuser'), roles=['customer'], name='First Cust')
    if not user_datastore.find_user(email = "firstprof@servicemaster.com"):
        user_datastore.create_user(email = "firstprof@servicemaster.com", password=hash_password('firstprof'), roles=['professional'], name='First Prof')
    db.session.commit()