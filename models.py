from flask_sqlalchemy import SQLAlchemy
from app import app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_security import  Security, UserMixin, RoleMixin, SQLAlchemyUserDatastore
from flask_security.models import fsqla_v3 as fsq

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
    role=db.Column(db.String(16), nullable=False)
    contact=db.Column(db.Integer)
    service_id=db.Column(db.Integer, db.ForeignKey('service.id'))
    experience=db.Column(db.Integer)
    active=db.Column(db.String(16))
    profile=db.Column(db.String(512))
    fs_uniquifier=db.Column(db.String,nullable=False)
    roles=db.relationship('Role', secondary='userroles')

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')
    
    @password.setter
    def password(self, password):
        self.passwordhash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.passwordhash, password)
    
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
    cuser=db.Column(db.String(32),db.ForeignKey('user.username'),nullable=False)
    puser=db.Column(db.String(32),db.ForeignKey('user.username'),nullable=False)
    service_id=db.Column(db.Integer, db.ForeignKey('service.id'), nullable=False)
    requestdate=db.Column(db.DateTime, nullable=False)
    completedate=db.Column(db.DateTime, nullable=True)
    status=db.Column(db.String(32), nullable=False)
    rating=db.Column(db.String(32), nullable=True)
    review=db.Column(db.String(512), nullable=True)

    users=db.relationship('User', backref='servicerequests', lazy=True)
    services=db.relationship('Service', backref='servicerequests', lazy=True)\

with app.app_context():
    user_datastore = SQLAlchemyUserDatastore(db, User, Role)
    security.init_app(app, user_datastore)
    db.create_all()
    user_datastore.find_or_create_role(name='admin', description='Administrator')
    user_datastore.find_or_create_role(name='customer', description='Customer')
    user_datastore.find_or_create_role(name='professional', description='Professional')