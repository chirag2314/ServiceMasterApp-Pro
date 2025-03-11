from flask_restful import Api, Resource, fields, reqparse, marshal_with
from flask_security import auth_required
from models import db, Service, User, ServiceRequest

api=Api(prefix='/api')

parser = reqparse.RequestParser()

parser.add_argument('name',type=str)
parser.add_argument('description', type=str)
parser.add_argument('price',type=int)
parser.add_argument('time', type=int)


services_fields = {
    'name': fields.String,
    'description': fields.String,
    'price': fields.Integer,
    'time': fields.Integer
}

class ServiceResources(Resource):
    @auth_required()
    @marshal_with(services_fields)
    def get(self):
        all_resources=Service.query.all()
        return all_resources
    
    @auth_required()
    @marshal_with(services_fields)
    def post(self):
        args=parser.parse_args()
        services=Service(name=args.name, description=args.description, price=args.price, time=args.time)
        db.session.add(services)
        db.session.commit()
        return {'message' : 'resource created'}, 200
    
api.add_resource(ServiceResources, '/services')