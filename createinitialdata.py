from flask_security import SQLAlchemyUserDatastore
from extensions import db
from flask_security.utils import hash_password


def create_data(user_datastore : SQLAlchemyUserDatastore):

    user_datastore.find_or_create_role(name='admin', description="Administrator")
    user_datastore.find_or_create_role(name='customer', description='Customer')
    user_datastore.find_or_create_role(name='professional', description='Professional')

    if not user_datastore.find_user(email = "admin@servicemaster.com"):
        user_datastore.create_user(email = "admin@servicemaster.com", password=hash_password('admin'), roles=['admin'], name='Admin')
    db.session.commit()

# commenting to resolve commit errors
