from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'FundMe.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^register', 'FundMe.SME.views.register'),
    url(r'^search', 'FundMe.SME.views.search'),
    url(r'^send_email', 'FundMe.SME.views.send_email'),
)