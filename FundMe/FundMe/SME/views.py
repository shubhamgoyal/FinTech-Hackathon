from django.shortcuts import render
import pymongo
from pymongo import MongoClient
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

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