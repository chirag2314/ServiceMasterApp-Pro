from flask_sqlalchemy import SQLAlchemy
from app import app
from flask_security import  Security, UserMixin, RoleMixin, SQLAlchemyUserDatastore
from flask_security.models import fsqla_v3 as fsq
from flask_security.utils import hash_password

db = SQLAlchemy(app)
security=Security(app)

fsq.FsModels.set_db_info(db)

#Database Modelling

class User(db.Model, UserMixin):
    __tablename__='user'
    id=db.Column(db.Integer, primary_key=True)
    email=db.Column(db.String(32), nullable=False, unique=True)
    passwordhash=db.Column(db.String(512), nullable=False)
    name=db.Column(db.String(64), nullable=False)
    pincode=db.Column(db.String(8))
    contact=db.Column(db.Integer)
    service_id=db.Column(db.Integer, db.ForeignKey('service.id'))
    experience=db.Column(db.Integer)
    active=db.Column(db.String(16))
    profile=db.Column(db.String(512))
    fs_uniquifier=db.Column(db.String,nullable=False)
    roles=db.relationship('Role', secondary='userroles')
    
class Role(db.Model, RoleMixin):
    __tablename__='role'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(64), nullable=False)
    description=db.Column(db.String(512), nullable=False)

class UserRoles(db.Model):
    __tablename__='userroles'
    id=db.Column(db.Integer, primary_key=True)
    userid=db.Column(db.Integer, db.ForeignKey('user.id'))
    roleid=db.Column(db.Integer, db.ForeignKey('role.id'))

class Service(db.Model):
    __tablename__='service'
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(32),nullable=False)
    price=db.Column(db.Integer, nullable=False)
    description=db.Column(db.String(512), nullable=False)
    time=db.Column(db.Integer,nullable=False)

    professionals=db.relationship('User', backref='service', lazy=True)

class ServiceRequest(db.Model):
    __tablename__='servicerequests'
    servicereqid=db.Column(db.Integer,primary_key=True)
    cuser=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    puser=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    service_id=db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    requestdate=db.Column(db.DateTime, nullable=False)
    completedate=db.Column(db.DateTime, nullable=True)
    status=db.Column(db.String(32), nullable=False)
    rating=db.Column(db.String(32), nullable=True)
    review=db.Column(db.String(512), nullable=True)

    services=db.relationship('Service', backref='servicerequests', lazy=True)
    professional = db.relationship('User', foreign_keys = [puser])
    customer = db.relationship('User', foreign_keys= [cuser])
 
with app.app_context():
    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    security.init_app(app, user_datastore)
    user_datastore.find_or_create_role(name='admin', description="Administrator")
    user_datastore.find_or_create_role(name='customer', description='Customer')
    user_datastore.find_or_create_role(name='professional', description='Professional')

    if not user_datastore.find_user(email = "admin@servicemaster.com"):
        user_datastore.create_user(email = "admin@servicemaster.com", passwordhash=hash_password('admin'), roles=['admin'], name='Admin')
    if not user_datastore.find_user(email = "firstuser@servicemaster.com"):
        user_datastore.create_user(email = "firstuser@servicemaster.com", passwordhash=hash_password('firstuser'), roles=['customer'], name='First Cust')
    if not user_datastore.find_user(email = "firstprof@servicemaster.com"):
        user_datastore.create_user(email = "firstprof@servicemaster.com", passwordhash=hash_password('firstprof'), roles=['professional'], name='First Prof')
    db.create_all()
    db.session.commit()