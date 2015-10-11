from django.shortcuts import render
import pymongo
from pymongo import MongoClient
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import pprint
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from django.views.decorators.cache import never_cache
import json
import smtplib

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
		# print(request)
		print(request.POST)
		received_json_data = json.loads(request.body.decode('utf-8'))
		print(received_json_data)
		sme = {}
		for field in LIST_POSSIBLE_ALL_FIELDS_REGISTER_SME:
			if field in received_json_data:
				sme[field] = received_json_data[field]
				print(sme)
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

def send_email(request):
	fromaddr = 'no.reply.funding.me@gmail.com'
	toaddrs  = ['fionagoo@gmail.com']
	cc = ['shubham.goyal@holmusk.com']
	subject = 'FundingMe Connection: Holmusk & DBS Bank'
	msg = '''
Hi Shubham,

Congratulations! Fiona from DBS Bank Ltd. Singapore is interested in connecting with you. Please find her message below -

"This is Fiona Ng from DBS Bank Ltd, I would like to set-up a meeting with you to further discuss our indicative facility offer. You can find my name card enclosed."

If you do not want to receive e-mail notifications, you can always change your notification settings at www.funding.me/privacy

For support requests, please contact support@funding.me.

Thank you.

"We help you solve funding issues, so you can focus on execution. With you, always!"
	'''	
	message = 'Subject: %s\nCC: %s\r\n%s' % (subject, ",".join(cc), msg)
	username = 'no.reply.funding.me.'
	password = 'funding.me'

	server = smtplib.SMTP('smtp.gmail.com:587')
	server.set_debuglevel(1)
	server.starttls()
	server.login(username,password)
	server.sendmail(fromaddr, toaddrs + cc, message)
	server.quit()

	return HttpResponse(status = 200)