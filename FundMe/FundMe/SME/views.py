from django.shortcuts import render
import pymongo
from pymongo import MongoClient
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import pprint

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
		print(document)
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

def search(request):
	if request.method == 'GET':
		print(request.GET)
		if len(list(request.GET.items())) == 0:
			list_sme = get_list_of_all_sme_organizations_from_db()
			return(HttpResponse('Hello, World!<br />%s' % list_sme))