from flask_restful import Api, Resource, fields, reqparse, marshal_with
from flask_security import auth_required
from extensions import cache
from models import db, Service, User, ServiceRequest, UserRoles, Role

api=Api(prefix='/api')

parser = reqparse.RequestParser()
profparser = reqparse.RequestParser()
srparser = reqparse.RequestParser()

parser.add_argument('id', type=int)
parser.add_argument('name',type=str)
parser.add_argument('description', type=str)
parser.add_argument('price',type=int)
parser.add_argument('time', type=int)


services_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'description': fields.String,
    'price': fields.Integer,
    'time': fields.Integer
}

class ServiceResources(Resource):
    #@auth_required('token')
    @cache.cached(timeout=60) #seconds
    @marshal_with(services_fields)
    def get(self):
        all_resources=Service.query.all()
        return all_resources
    
    #@auth_required('token')
    @marshal_with(services_fields)
    def post(self):
        args=parser.parse_args()
        services=Service(name=args.name, description=args.description, price=args.price, time=args.time)
        db.session.add(services)
        db.session.commit()
        return {'message' : 'service created'}, 200
     
api.add_resource(ServiceResources, '/services')

class ServiceResourceForDelete(Resource):
    #@auth_required('token')
    @marshal_with(services_fields)
    def get(self,id):
        all_resources=Service.query.get(id)
        return all_resources
    
    #@auth_required('token')
    @marshal_with(services_fields)
    def post(self, id):
        service=Service.query.get(id)
        if not service:
            return {'message' : 'invalid service'}, 404
        db.session.delete(service)
        db.session.commit()
        return {'message' : 'service deleted'}, 200
        
api.add_resource(ServiceResourceForDelete, '/deleteservice/<int:id>')

class ServiceResourceForEdit(Resource):
    @auth_required('token')
    @marshal_with(services_fields)
    def get(self,id):
        all_resources=Service.query.get(id)
        return all_resources
    
    @auth_required('token')
    @marshal_with(services_fields)
    def post(self, id):
        args=parser.parse_args()
        service=Service.query.get(id)
        if not service:
            return {'message' : 'invalid service'}, 404
        service.name=args.name
        service.description=args.description
        service.price=args.price
        service.time=args.time        
        db.session.commit()
        return {'message' : 'service updated'}, 200
        
api.add_resource(ServiceResourceForEdit, '/editservice/<int:id>')

profparser.add_argument('id', type=int)
profparser.add_argument('email',type=str)
profparser.add_argument('name', type=str)
profparser.add_argument('pincode',type=str)
profparser.add_argument('contact', type=int)
profparser.add_argument('service_id', type=int)
profparser.add_argument('experience', type=int)
profparser.add_argument('active', type=str)

professional_fields = {
    'id' : fields.Integer,
    'email': fields.String,
    'name': fields.String,
    'pincode': fields.String,
    'contact': fields.Integer,
    'service_id': fields.Integer,
    'experience': fields.Integer,
    'active': fields.String
}

class ProfessionalData(Resource):
    @auth_required('token')
    @cache.cached(timeout=60)
    @marshal_with(professional_fields)
    def get(self):
        all_professionals = User.query.join(UserRoles).join(Role).filter(Role.name == 'professional').all()
        return all_professionals
    
api.add_resource(ProfessionalData, '/professionals')

class ProfessionalResourceForApproval(Resource):
    @auth_required('token')
    @marshal_with(professional_fields)
    def get(self, id):
        all_resources=User.query.get(id)
        return all_resources
    
    @auth_required('token')
    def post(self, id):
        args=profparser.parse_args()
        prof=User.query.get(id)
        if not prof:
            return {'message' : 'invalid professional'}, 404
        prof.active=args.active
        db.session.commit()
        return {'message' : 'professional updated'}, 200
    
api.add_resource(ProfessionalResourceForApproval, '/aupdateprofessional/<int:id>')

class ProfessionalResourceForBooking(Resource):
    @auth_required('token')
    @cache.cached(timeout=60)
    @marshal_with(professional_fields)
    def get(self, id):
        all_resources=User.query.filter_by(service_id=id, active='Approved').all()
        return all_resources
    
api.add_resource(ProfessionalResourceForBooking, '/serviceprofs/<int:id>')

srparser.add_argument('servicereqid', type=int)
srparser.add_argument('cuser',type=int)
srparser.add_argument('puser', type=int)
srparser.add_argument('service_id',type=int)
srparser.add_argument('requestdate', type=str)
srparser.add_argument('completedate', type=str)
srparser.add_argument('completedate', type=str)
srparser.add_argument('status', type=str)
srparser.add_argument('rating', type=str)
srparser.add_argument('review', type=str)

servicerequest_fields = {
    'servicereqid' : fields.Integer,
    'cuser' : fields.Integer,
    'puser' : fields.Integer,
    'service_id' : fields.Integer,
    'requestdate' : fields.DateTime,
    'completedate' : fields.DateTime,
    'servicedate' : fields.DateTime,
    'status' : fields.String,
    'rating' : fields.String,
    'review' : fields.String
}

class ServiceRequestData(Resource):
    @auth_required('token')
    @cache.cached(timeout=60)
    @marshal_with(servicerequest_fields)
    def get(self):
        all_servicerequests = ServiceRequest.query.all()
        return all_servicerequests
    
api.add_resource(ServiceRequestData, '/servicerequests')

class ServiceRequestDataForPDashboard(Resource):
    @auth_required('token')
    @marshal_with(servicerequest_fields)
    def get(self,id):
        all_resources=ServiceRequest.query.filter_by(puser=id).all()
        return all_resources
    
api.add_resource(ServiceRequestDataForPDashboard, '/servicerequestsp/<int:id>')

class ServiceRequestDataForCDashboard(Resource):
    @auth_required('token')
    @marshal_with(servicerequest_fields)
    def get(self,id):
        all_resources=ServiceRequest.query.filter_by(cuser=id).all()
        return all_resources
    
api.add_resource(ServiceRequestDataForCDashboard, '/servicerequestsc/<int:id>')

# commenting to resolve commit errors
