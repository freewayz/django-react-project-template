from django.conf.urls import url, include
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from user_auth import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    # Core Routed URLs
    url(r'^api/v1/', include(router.urls)),

    # JWT Auth
    url(r'^api/v1/auth/obtain_token/', obtain_jwt_token),

    # Browsable API
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Main Entry Point for Single Page App
    url(r'^.*$', csrf_exempt(TemplateView.as_view(template_name='index.html'))),
]
