from django.conf.urls import url
from . import views

urlpatterns = [
    #link response data
    url(r'^$', views.index, name="player"),
    url(r'^check_licences/$', views.check_licences, name='checklicences'),
    url(r'^bitmovin/$', views.bitmovin, name='player_bitmovin')
]
