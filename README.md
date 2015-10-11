# FinTech-Hackathon

This is a web application for the Funding.Me platform.

The team behind this:

1. Fiona Ng (Business Development and Operations)

2. Tan See Youu (Software Engineer)

3. Lee Chun Hoe (Software Engineer)

4. Shubham Goyal (Software Engineer)

###For Developers -

The backend is written in Python using the Django framework and frontend is written in HTML/CSS using Angular JS.

The backend code can be found neatly divided into apps at /FundMe/FundMe. Each app has code in MVC pattern. The routing information can be found in urls.py and the view can be found in views.py. For data persistence, we use MongoDB. To ensure speed and efficiency, we properly index various fields.

The front-end leverage on AngularJS. The portal.html utilize the Single Page Application concept and the pages will be able to switching among signup, register and panel(for listing of company and allow banker to search)

Panel.html using filtering functiont to allow banker filter and search for company they want to loan. 
