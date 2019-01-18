# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from utils import get_author

# Create your views here.

def check_licences(request):
    uname = str(request.GET.get('user'))
    if get_author(uname)[0][0]:
        return 'play=true'
    else:
        return 'play=false'

@csrf_exempt
@login_required(login_url='/accounts/login/')
def index(request):
    template = loader.get_template("player/index.html")
    uname = str(request.user)
    context = {
        'username': uname,
    }
    print get_author(uname)[0][0]
    return HttpResponse(template.render(context, request))

@csrf_exempt
@login_required(login_url='/accounts/login/')
def bitmovin(request):
    template = loader.get_template("bitmovin/index.html")
    uname = str(request.user)
    context = {
        'username': uname,
    }
    print get_author(uname)[0][0]
    return HttpResponse(template.render(context, request))
