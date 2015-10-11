from django.shortcuts import render
import pymongo
from pymongo import MongoClient
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import pprint
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from django.views.decorators.cache import never_cache

LIST_POSSIBLE_ALL_FIELDS_REGISTER_SME = [
	'email',
	'password',
	'reg_no',
	'phoneNumber'
]

#Database Connection
client = MongoClient()
db = client.FundingME
sme_collection = db.sme

#Set up pretty printer with desired settings
pp = pprint.PrettyPrinter(indent=4)

def get_list_of_all_sme_organizations_from_db():
	cursor = db.sme.find().sort([
		("rating", pymongo.ASCENDING)
	])
	list_sme = []
	for document in cursor:
		list_sme.append(document)
	return list_sme

@csrf_exempt
def register(request):
	if request.method == 'POST':
		sme = {}
		for field in LIST_POSSIBLE_ALL_FIELDS_REGISTER_SME:
			if field in request.POST:
				sme[field] = request.POST[field]
		try:
			db.sme.insert(sme)
			
			#ensuring that each sme (denoted by reg_no) has only one occurence in the collection
			sme_collection.create_index("reg_no", unique=True)
			
			return HttpResponse(status=201)
		except Exception as e:
			return HttpResponse(str(e), status = 409)

@never_cache
def search(request):
	if request.method == 'GET':
		if len(list(request.GET.items())) == 0:
			list_sme = get_list_of_all_sme_organizations_from_db()
			# return(HttpResponse('Hello, World!<br />%s' % list_sme))
			return render_to_response('panel.html', {'list_sme':list_sme}, context_instance=RequestContext(request))