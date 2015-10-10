from django.conf.urls import *
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'FundMe.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^sme/', include('FundMe.SME.urls')),
)
